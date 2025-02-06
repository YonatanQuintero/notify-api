import { Injectable } from "@nestjs/common";
import Bull, { Queue } from "bull";
import { QueueServiceError } from "../errors/queue-service.error";

@Injectable()
export abstract class AbstractQueue<T> {
    constructor(
        protected readonly queue: Queue
    ) { }

    async add(dto: T): Promise<Bull.Job<T>> {
        return await this.queue.add(dto);
    }

    async getJobStatus(jobId: string): Promise<string> {
        const job = await this.queue.getJob(jobId);
        if (!job) {
            throw new QueueServiceError(`Job with id ${jobId} not found.`);
        }
        return job.getState();
    }

    async getJobDetails(jobId: string): Promise<T> {
        const job = await this.queue.getJob(jobId);
        if (!job) {
            throw new QueueServiceError(`Job with id ${jobId} not found.`);
        }
        return job.data;
    }
}
