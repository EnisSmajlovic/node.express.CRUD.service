/* eslint no-undefined: 0 */

jest.mock('../service/Service');

const Service = require('../service/Service'),
    ServiceMock = new Service(),
    Controller = require('../controller/Controller'),
    Subject = new Controller(ServiceMock);


describe('Controller', () => {
    describe('FetchUser', () => {
        const req = {
            params : {
                id : '1b671a64-40d5-491e-99b0-da01ff1f3341'
            }
        };

        const res = {
            status : jest.fn(),
            send   : jest.fn()
        };

        res.status.mockReturnThis();

        beforeEach(async () => {
            await Subject.FetchUser(req, res);
        });

        it('Should be called with first parameter', () => {
            expect(ServiceMock.FetchUser).toHaveBeenCalledWith('1b671a64-40d5-491e-99b0-da01ff1f3341');
        });

        it('Should return status 404 error', () => {
            expect(res.status).toHaveBeenCalledWith(404);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
    });

    describe('When method is called with an invalid parameter', () => {
        const req = {
            params : {
                id : 123
            }
        };

        const res = {
            status : jest.fn(),
            send   : jest.fn()
        };

        res.status.mockReturnThis();

        beforeEach(async () => {
            await Subject.FetchUser(req, res);
        });

        it('Should return status 400 error', () => {
            expect(res.status).toHaveBeenCalledWith(400);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
    });

    describe('When method receives a valid response', () => {
        const req = {
            params : {
                id : '1b671a64-40d5-491e-99b0-da01ff1f3341'
            }
        };

        const res = {
            status : jest.fn(),
            send   : jest.fn()
        };

        res.status.mockReturnThis();

        const user = {
            id    : '1b671a64-40d5-491e-99b0-da01ff1f3341',
            email : 'user@test.com'
        };

        beforeEach(async () => {
            ServiceMock.FetchUser.mockImplementation(() => {
                return user;
            });
            await Subject.FetchUser(req, res);
        });

        it('Should return ID and Email', () => {
            expect(res.send).toHaveBeenCalledWith({
                id    : '1b671a64-40d5-491e-99b0-da01ff1f3341',
                email : 'user@test.com'
            });
        });

        it('Should be called with status 200', () => {
            expect(res.status).toHaveBeenCalledWith(200);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
    });

    describe('When method receives an invalid response 404 ID not defined', () => {
        const req = {
            params : {
                id : '1b671a64-40d5-491e-99b0-da01ff1f3341'
            }
        };

        const res = {
            status : jest.fn(),
            send   : jest.fn()
        };

        res.status.mockReturnThis();

        beforeEach(async () => {
            ServiceMock.FetchUser.mockImplementation(() => {
                return null;
            });
            await Subject.FetchUser(req, res);
        });

        it('Should provide response message to the client if ID is not defined', () => {
            expect(res.send).toHaveBeenCalledWith('Error 404 ID not found');
        });

        it('Should provide status 404 if ID is not defined', () => {
            expect(res.status).toHaveBeenCalledWith(404);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
    });

    describe('When method throws an exception', () => {
        const req = {};

        const res = {
            status : jest.fn(),
            send   : jest.fn()
        };

        res.status.mockReturnThis();

        beforeEach(async () => {
            ServiceMock.FetchUser.mockImplementation(() => {
                throw new Error('err');
            });
            await Subject.FetchUser(req, res);
        });

        it('Should provide status 500', () => {
            expect(res.status).toHaveBeenCalledWith(500);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
    });

    describe('FetchUsers', () => {
        describe('When FetchUsers is called with required parameters', () => {
            const req = {
                query : {
                    start : 1,
                    rows  : 5
                }
            };

            const res = {
                status : jest.fn(),
                send   : jest.fn()
            };

            res.status.mockReturnThis();

            beforeEach(async () => {
                await Subject.FetchUsers(req, res);
            });

            it('Should be called with all args', () => {
                expect(ServiceMock.FetchUsers).toHaveBeenCalledWith(1, 5);
            });

            it('Should return status code 200', () => {
                expect(res.status).toHaveBeenCalledWith(200);
            });

            afterEach(() => {
                jest.clearAllMocks();
            });
        });

        describe('When FetchUsers receives a valid response', () => {
            const req = {
                query : {
                    start : 0,
                    rows  : 10
                }
            };

            const res = {
                status : jest.fn(),
                send   : jest.fn()
            };

            res.status.mockReturnThis();

            const user = {
                id    : '1b671a64-40d5-491e-99b0-da01ff1f3341',
                email : 'unit@test.com'
            };

            beforeEach(async () => {
                ServiceMock.FetchUsers.mockImplementation(() => {
                    return user;
                });
                await Subject.FetchUsers(req, res);
            });

            it('Should return a response with data', () => {
                expect(res.send).toHaveBeenCalledWith({
                    id    : '1b671a64-40d5-491e-99b0-da01ff1f3341',
                    email : 'unit@test.com'
                });
            });

            afterEach(() => {
                jest.clearAllMocks();
            });
        });

        describe('When FetchUsers receives a invalid response', () => {
            const req = {};

            const res = {
                status : jest.fn(),
                send   : jest.fn()
            };

            res.status.mockReturnThis();

            beforeEach(async () => {
                ServiceMock.FetchUsers.mockImplementation(() => {
                    throw new Error('error');
                });
                await Subject.FetchUsers(req, res);
            });

            it('Should return 500 if FetchUsers throws an error', () => {
                expect(res.status).toHaveBeenCalledWith(500);
            });

            afterEach(() => {
                jest.clearAllMocks();
            });
        });

        describe('When FetchUsers receives an invalid response', () => {
            const req = {
                query : {
                    start : undefined,
                    rows  : undefined
                }
            };

            const res = {
                status : jest.fn(),
                send   : jest.fn()
            };

            res.status.mockReturnThis();

            beforeEach(async () => {
                await Subject.FetchUsers(req, res);
            });

            it('Should return a status 400 response', () => {
                expect(res.status).toHaveBeenCalledWith(400);
            });

            afterEach(() => {
                jest.clearAllMocks();
            });
        });
    });
});
