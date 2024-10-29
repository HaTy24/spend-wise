import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionService } from './transaction.service';

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn(),
  remove: jest.fn(),
};

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: getRepositoryToken(Transaction),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a single transaction', async () => {
    const transaction = {
      id: '7ccfa47f-f482-4ac7-a15d-1115661b2010',
      amount: 30,
    };
    mockRepository.findOneBy.mockResolvedValue(transaction);

    const result = await service.findOne('7ccfa47f-f482-4ac7-a15d-1115661b2010');

    expect(result).toEqual(transaction);
  });
});
