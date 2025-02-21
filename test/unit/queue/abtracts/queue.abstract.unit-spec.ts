import { Queue } from 'bull'
import { AbstractQueue } from 'src/queue/abstracts/queue.abstract'
import { QueueServiceError } from 'src/queue/errors/queue-service.error'

// Create a concrete subclass for testing purposes.
class TestQueue<T> extends AbstractQueue<T> { }

describe('AbstractQueue', () => {
  let mockQueue: Partial<Queue>
  let abstractQueue: AbstractQueue<any>

  beforeEach(() => {
    mockQueue = {
      add: jest.fn(),
      getJob: jest.fn()
    }
    abstractQueue = new TestQueue(mockQueue as Queue)
  })

  describe('add', () => {
    it('should add an entity and return the job', async () => {
      const entity = { test: 'data' }
      const fakeJob = {
        id: 'job1',
        data: entity,
        getState: jest.fn().mockResolvedValue('completed')
      };

      (mockQueue.add as jest.Mock).mockResolvedValue(fakeJob)

      const result = await abstractQueue.add(entity)

      expect(mockQueue.add).toHaveBeenCalledWith(entity)
      expect(result).toEqual(fakeJob)
    })
  })

  describe('getJobStatus', () => {
    it('should return the job status when the job exists', async () => {
      const jobId = 'job1'
      const fakeJob = {
        id: jobId,
        data: { some: 'data' },
        getState: jest.fn().mockResolvedValue('completed')
      };

      (mockQueue.getJob as jest.Mock).mockResolvedValue(fakeJob)

      const status = await abstractQueue.getJobStatus(jobId)

      expect(mockQueue.getJob).toHaveBeenCalledWith(jobId)
      expect(fakeJob.getState).toHaveBeenCalled()
      expect(status).toBe('completed')
    })

    it('should throw QueueServiceError when the job is not found', async () => {
      const jobId = 'nonexistent';
      (mockQueue.getJob as jest.Mock).mockResolvedValue(null)

      await expect(abstractQueue.getJobStatus(jobId)).rejects.toThrow(QueueServiceError)
    })
  })

  describe('getJobDetails', () => {
    it('should return the job data when the job exists', async () => {
      const jobId = 'job1'
      const entity = { test: 'data' }
      const fakeJob = {
        id: jobId,
        data: entity,
        getState: jest.fn().mockResolvedValue('completed')
      };

      (mockQueue.getJob as jest.Mock).mockResolvedValue(fakeJob)

      const details = await abstractQueue.getJobDetails(jobId)

      expect(mockQueue.getJob).toHaveBeenCalledWith(jobId)
      expect(details).toEqual(entity)
    })

    it('should throw QueueServiceError when the job is not found', async () => {
      const jobId = 'nonexistent';
      (mockQueue.getJob as jest.Mock).mockResolvedValue(null)

      await expect(abstractQueue.getJobDetails(jobId)).rejects.toThrow(QueueServiceError)
    })
  })
})
