import { Injectable } from '@nestjs/common'
import Bull, { Queue } from 'bull'
import { QueueServiceError } from '../errors/queue-service.error'

@Injectable()
export abstract class AbstractQueue<T> {
  constructor (
    protected readonly queue?: Queue
  ) { }

  async add (dto: T): Promise<Bull.Job<T>> {
    const job = await this.queue?.add(dto)
    if (job == null) {
      throw new QueueServiceError('Queue is not available.')
    }
    return job
  }

  async getJobStatus (jobId: string): Promise<string> {
    const job = await this.queue?.getJob(jobId)
    if (job == null) {
      throw new QueueServiceError(`Job with id ${jobId} not found.`)
    }
    return await job.getState()
  }

  async getJobDetails (jobId: string): Promise<T> {
    const job = await this.queue?.getJob(jobId)
    if (job == null) {
      throw new QueueServiceError(`Job with id ${jobId} not found.`)
    }
    return job.data
  }
}
