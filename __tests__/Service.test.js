jest.mock('../model/Model', () => {
    const mock = {
        findOne : jest.fn(),
        find    : jest.fn(),
        limit   : jest.fn(),
        skip    : jest.fn()
    };

    mock.find.mockReturnThis();
    mock.limit.mockReturnThis();
    mock.skip.mockReturnThis();

    return mock;
});

const Model = require('../model/Model'),
    Service = require('../service/Service'),
    Subject = new Service();


describe('Service', () => {
    describe('FetchUser', () => {
        describe('When FetchUser is called succesfully', () => {
            beforeEach(() => {
                Subject.FetchUser('1b671a64-40d5-491e-99b0-da01ff1f3341');
            });

            it('Should call FetchUser with first argument', () => {
                expect(Model.findOne).toHaveBeenCalledWith({
                    'id' : '1b671a64-40d5-491e-99b0-da01ff1f3341'
                });
            });

            afterEach(() => {
                jest.clearAllMocks();
            });
        });
    });

    describe('When FetchUser throws an exception', () => {
        beforeEach(() => {
            Model.findOne.mockImplementation(() => {
                throw new Error('err');
            });
        });

        it('Should call FetchUser with first argument', () => {
            let result;

            try {
                result = Subject.FetchUser();
            } catch (err) {
                result = err;
            }

            expect(result.message).toEqual('Internal server error');
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
    });

    describe('FetchUsers', () => {
        describe('When FetchUsers is called', () => {
            beforeEach(async () => {
                await Subject.FetchUsers(10, 1);
            });

            it('Should return a valid first argument that has been passed through the function', () => {
                expect(Model.skip).toHaveBeenCalledWith(10);
            });

            it('Should return a valid second argument that has been passed through the function', () => {
                expect(Model.limit).toHaveBeenCalledWith(1);
            });

            afterEach(() => {
                jest.clearAllMocks();
            });
        });

        describe('When FetchUsers throws an exception', () => {
            beforeEach(() => {
                Model.find.mockImplementation(() => {
                    throw new Error('err');
                });
            });

            it('Should call FetchUsers with first argument', async () => {
                let result;
                try {
                    result = await Subject.FetchUsers();
                } catch (err) {
                    result = err;
                }

                expect(result.message).toEqual('Internal server error');
            });

            afterEach(() => {
                jest.clearAllMocks();
            });
        });
    });
});
