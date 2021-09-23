include "../node_modules/circomlib/circuits/eddsaposeidon.circom";

template Claimer() {
    signal input tokenId;
    signal input account;
    signal private input sigS;
    signal private input sigR8x;
    signal private input sigR8y;

    component verifier = EdDSAPoseidonVerifier();

    var PUBKEY[2] = [
        680719853470249703747264349091321298858486440706401851189436714975661757024,
        1384141818555138328857393970508618595228991218959778234022869567593864179593
    ];

    verifier.enabled <== 1;
    verifier.Ax <== PUBKEY[0];
    verifier.Ay <== PUBKEY[1];
    verifier.S <== sigS;
    verifier.R8x <== sigR8x;
    verifier.R8y <== sigR8y;
    verifier.M <== tokenId;
}

component main = Claimer();
