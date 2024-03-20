import bcrypt from 'bcrypt';

const prices = [
    {
        name: 'Milena',
        email: 'milena.villamizar@hotmail.com',
        password: bcrypt.hashSync('12345678',10),
        confirmed: 1,
    },
    
]

export default users