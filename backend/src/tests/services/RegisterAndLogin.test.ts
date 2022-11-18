import { bankResponseForCreate, tokenOnlyString } from './../mocks/registerAndLoginMocks';
import { expect } from "chai";
import { describe } from "mocha";
import sinon from "sinon";
import prisma from '../../database/client';
import RegisterAndLoginService from '../../services/RegisterAndLogin.service';
import JWT from '../../helpers/jwt';
import Bcrypt from '../../helpers/bcrypt';

const model = prisma

const jwt = new JWT();

const bcrypt = new Bcrypt();

const service = new RegisterAndLoginService(model, jwt, bcrypt);

describe('RegisterAndLoginServices caso de sucesso', () => {
    describe('register efetuado com sucesso', () => {
        before(() => {
            sinon.stub(model.users, 'findMany').resolves([]);
            sinon.stub(model.users, 'create').resolves(bankResponseForCreate);
            sinon.stub(service, 'register').resolves(tokenOnlyString);
        });
        after(() => {
            sinon.restore();
        });
        it('deve retornar um token', async () => {
            const result = await service.register('Kratos', 'Esparta22');
            expect(result).to.be.equal(tokenOnlyString);
        });
    });

    describe('login efetuado com sucesso', () => {
        before(() => {
            sinon.stub(model.users, 'findUnique').resolves(bankResponseForCreate);
            sinon.stub(service, 'login').resolves(tokenOnlyString);
        });
        after(() => {
            sinon.restore();
        });
        it('deve retornar um token', async () => {
            const result = await service.login('Kratos', 'Esparta22');
            expect(result).to.be.equal(tokenOnlyString);
        });
    });
});