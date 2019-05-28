let dhttp = require('dhttp');
const assert = require('assert')
let bitcoin = require('bitcoinjs-lib');

function getNewAddress() {
    const keyPair = bitcoin.ECPair.makeRandom()
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey })
    assert.strictEqual(address.startsWith('1'), true)

    // Return new promise 
    return new Promise(function(resolve, reject) {
        resolve({address: address});
    	// dhttp({
        //     method: 'GET',
        //     url: 'https://blockchain.info/rawaddr/' + address
        // }, function (err, res) {
        //     if (err) reject(err);
        //     if (res.statusCode !== 200) reject(res.statusCode);
        //     if (res.headers['content-type'] !== 'application/json;charset=UTF-8') reject(res.headers['content-type'])
        //     const result = res.body;
        //     assert.strictEqual(result.n_tx, 0)
        //     assert.strictEqual(result.total_received, 0);
        //     assert.strictEqual(result.total_sent, 0);
        //     resolve(result);
        // })
    })

}
module.exports = {getNewAddress};

// function main() {
//     var initializePromise = getNewAddress();
//     initializePromise.then(function(result) {
//         console.log(result)
//     }, function(err) {
//         console.log(err);
//     })
// }
// main();