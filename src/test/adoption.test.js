import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';
const expect = chai.expect;

chai.use(chaiHttp);

describe('Adoption Router - Functional Tests', () => {
    let createdId;

    it('GET /api/adoptions', async () => {
        const res = await chai.request(app).get('/api/adoptions');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
    });

    it('POST /api/adoptions', async () => {
        const newAdoption = {
            userId: 'usuario123',
            petId: 'mascota456',
        };

        const res = await chai.request(app).post('/api/adoptions').send(newAdoption);
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('_id');
        createdId = res.body._id;
    });

    it('GET /api/adoptions/:id', async () => {
        const res = await chai.request(app).get(`/api/adoptions/${createdId}`);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id').eql(createdId);
    });

    it('PUT /api/adoptions/:id', async () => {
        const update = {
            status: 'finalized'
        };

        const res = await chai.request(app).put(`/api/adoptions/${createdId}`).send(update);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status').eql('finalized');
    });

    it('DELETE /api/adoptions/:id', async () => {
        const res = await chai.request(app).delete(`/api/adoptions/${createdId}`);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').that.includes('eliminada');
    });

    it('GET /api/adoptions/:id', async () => {
        const res = await chai.request(app).get('/api/adoptions/invalidID123');
        expect(res).to.have.status(404);
    });
});
