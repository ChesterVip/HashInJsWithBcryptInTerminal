// const {createHmac} = require('crypto');
// const salt ='LJKLxn@(*&^%$%^7kjhghjklkjhbv)(*&^&*()lkjnb":{}|"?>hvLKJHGFTRYUI90876tR%^U&*I(09yiuhjknhugyhfvnbjlkhbvGHJKJHJKL)(*&^*()bn bsvghj';
// const hash = createHmac('sha512', salt)
// .update('Jebac PIS')
// .digest('hex');
// console.log(hash);

const {hash, compare} = require('bcrypt');

const {writeFile, readFile} = require('fs').promises;

class Password {

    static #_pathFile = './data/pwd.json';
    static #_salt1 = 15;

    static setPassword(passw) {
       hash(passw, this.getSalt(), (err, pass) => {
            if (err) throw err;
            console.log('Bcrypt Hash: DONE');
            const dejta = JSON.stringify(pass);
            (async () => {
                await writeFile(this.getPathFile(), dejta, {
                    encoding: "utf-8",
                })
            })();
        });
    }

    static async checkPassword(passw) {
        const fileToRead = await readFile(this.getPathFile(), 'utf8')
        const dataHash = JSON.parse(fileToRead);
        compare(passw, dataHash, (err, data) => {
            if (err) {
                console.log(err)
            }
            if (data) {
                console.log('Hasło poprawne wchodzisz :-)')
                return;
            }
            console.log('Hasło złe :-/ nie wchodzisz')
        })
    }


    static getPathFile() {
        return this.#_pathFile;
    }

    static getSalt() {
        return this.#_salt1;
    }
}

switch (process.argv[2]) {
    case 'addPass':
        Password.setPassword(process.argv[3]);
        break;
    case 'checkPass':
        Password.checkPassword(process.argv[3]);
        break;
    case '' || null || undefined:
        console.log('null: aby uruchomic program wpisz node.js index js i następnie czynność [addPass][spacja][\"Hasło\"] - aby ustawić hasło :-)\n' +
            '[checkPass][spacja][\"Hasło\"] aby sprawdzić Hasło :)\nPrzykład: node index.js addPass MegaK || node index.js checkPass MegaK\n Powodzenia!');
        break;
    default:
        console.log('wrong:aby uruchomic program wpisz node.js index js i następnie czynność [addPass][spacja][\"Hasło\"] - aby ustawić hasło :-)\n' +
            '[checkPass][spacja][\"Hasło\"] aby sprawdzić Hasło :)\nPrzykład: node index.js addPass MegaK || node index.js checkPass MegaK\n Powodzenia!');
};
