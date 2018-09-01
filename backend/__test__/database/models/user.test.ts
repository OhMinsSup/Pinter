import * as mongoose from 'mongoose';
import User from '../../../src/database/models/User';

describe("User model test", () => {
    beforeAll(async () => {
        await User.remove({});
    });

    afterEach(async () => {
        await User.remove({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it("has a modules", () => {
        expect(User).toBeDefined();
    });

    describe("save user", () => {
        it("saves a user", async () => {
            const user = new User({
                username: 'test',
                email: 'test@test.com',
                profile: {
                    displayName: 'veloss',
                    thumbnail: 'https://avatars.io/platform/userId',
                },
            });
            await user.save();

            const username = 'test';
            const findUser = await User.findOne({ username: 'test' });
            const result = findUser.username;
            expect(result).toEqual(username);
        });
    });
});