import { HttpStatus, INestApplication } from "@nestjs/common";
import { bootstrapAppTest } from "test/e2e/helpers/bootstrap-app-test.helper";
import * as request from 'supertest';
import { NodeMailerTransporterStubService } from "test/e2e/helpers/services/node-mailer-transporter-stub.service";

describe("EmailNotificationController E2E Tests", () => {

    let app: INestApplication;
    let transporterStub: NodeMailerTransporterStubService;

    beforeAll(async () => {
        transporterStub = new NodeMailerTransporterStubService();
        app = await bootstrapAppTest([], transporterStub);
    });

    afterAll(async () => {
        await app.close();
    });

    describe('/api/v1/notifications/email/welcome (POST)', () => {
        it('should send welcome email successfully', async () => {
            await request(app.getHttpServer())
                .post('/api/v1/notifications/email/welcome')
                .set('x-api-key', 'b981937e5689a4596e1ae3c0f6d240af47f7d882f8ef2b97c3070495bb20f740')
                .send({ username: 'Yonax73', recipients: ['yonax73@gmail.com'] })
                .expect(HttpStatus.OK)
                .expect((res) => {
                    expect(typeof res.text).toBe('string');
                });

            //TODO: Implement inmmediate quee processor
            // setTimeout(() => {
            //     console.log(transporterStub.sentEmails);
            // }, 1000);

            // console.log(transporterStub.sentEmails)

            // expect(transporterStub.sentEmails.length).toBeGreaterThan(0);
            // const sentEmail = transporterStub.sentEmails[0];
            // expect(sentEmail.mailOptions.from).toMatchObject({
            //     address: expect.any(String),
            //     name: expect.any(String),
            // });
            // expect(sentEmail.mailOptions.to).toContain('alaska@example.com');
            // expect(sentEmail.mailOptions.subject).toBeDefined();
            // expect(sentEmail.mailOptions.html).toBeDefined();

        });


        // it('should throw error for invalid DTO', () => {
        //     return request(app.getHttpServer())
        //         .post('/api/v1/notifications/email/welcome')
        //         .set('Accept-Language', 'en')
        //         .send({ username: '', recipients: [] })  // invalid data
        //         .expect(400);
        // });
    });

    it.todo("should send a welcome email");
});