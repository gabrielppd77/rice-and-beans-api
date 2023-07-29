import { InMemoryUserRepository } from '@test/repositories/in-memory-user.repository';

import { UserCreate } from './user-create';
import { EmailInUseException } from './exceptions/email-in-use.exception';

import { User } from '@domain/entities/user';
import { Company } from '@domain/entities/company';

describe('UserCreate', () => {
  it('should show error when found email that has been registred', async () => {
    const userRepository = new InMemoryUserRepository();
    const userCreate = new UserCreate(userRepository);

    const user = new User({
      email: 'email@gmail.com',
      name: 'Jon Doe',
      password: '1234',
      phone: '32944445555',
    });
    const company = new Company({
      name: 'Company name',
      userId: user.id,
      description: 'Description Company',
      phone: '32522223333',
    });

    userRepository.create(user, company);

    await expect(
      async () =>
        await userCreate.execute({
          newCompany: {
            name: company.name,
          },
          newUser: {
            email: user.email,
            name: user.name,
            password: user.password,
            phone: user.phone,
          },
        }),
    ).rejects.toThrow(EmailInUseException);
  });

  it('should be able to create an user and your company', async () => {
    const userRepository = new InMemoryUserRepository();
    const userCreate = new UserCreate(userRepository);

    const userToCreate = {
      email: 'emailUser@email.com',
      name: 'Jon Doe',
      password: '1234',
      phone: 'phoneUser',
    };
    const companyToCreate = {
      name: 'nameCompany',
      description: 'descriptionCompany',
      phone: 'phoneCompany',
    };

    await userCreate.execute({
      newCompany: companyToCreate,
      newUser: userToCreate,
    });

    const userCreatedInDB = userRepository.users[0];
    const companyCreatedInDB = userRepository.companies[0];

    expect(userCreatedInDB).toBeTruthy();
    expect(userCreatedInDB.id).toBeDefined();
    expect(userCreatedInDB.password).toBeDefined();
    expect(userCreatedInDB.password).not.toEqual(userToCreate.password);
    expect(userCreatedInDB.email).toEqual(userToCreate.email);
    expect(userCreatedInDB.phone).toEqual(userToCreate.phone);

    expect(companyCreatedInDB).toBeTruthy();
    expect(companyCreatedInDB.id).toBeDefined();
    expect(companyCreatedInDB.name).toEqual(companyToCreate.name);
    expect(companyCreatedInDB.description).toEqual(companyToCreate.description);
    expect(companyCreatedInDB.phone).toEqual(companyToCreate.phone);
  });
});
