import { Job } from "bull";

export abstract class AbstractProcessor<T> {

    abstract run(job: Job<T>): Promise<void>;
}