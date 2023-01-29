//加密，解密方法
import { JSEncrypt } from 'jsencrypt';

class encryptedData {
    constructor() {
        this.state = {
            publicKey: `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv92J+GhgOyJqJEfUq9Z5
            d2scPhFnxPDFos+rGwLxBsrFbV4BiBqoB4lLmnrtmv477or6L+ADcOeMdmoAfPhc
            I/ZNkGzI/cGb6GaVq1PDNPmaBkwjlqugObL5Y0IQgDqxbrVe7A8VVldH1wecc3sH
            DjCHTwdl7nRDTwVCaLzBL3nfWKzBghTbbEDcJlYtKO+OvlFZKHM1EWy6PlPnRiPh
            Rkf9f+ysrguLLzTnzccAdalcnu1TK025Dgct7rTguzYlYI63y8HPTdXUhUCZxtBJ
            e88qpAFUdLmq2cmwpLyyUqm5VeVjKvflW2l6MF7p3JPqVZ9yGyv40a4Nm4Ewn6PJ
            rQIDAQAB`
        }
    }
    //  加密
    encryptedData(data) {
        // 新建JSEncrypt对象
        let encryptor = new JSEncrypt();
        // 设置公钥
        encryptor.setPublicKey(this.state.publicKey);
        // 加密数据
        return encryptor.encrypt(data);
    }
    // 解密
    decryptData(privateKey,data) {
        // 新建JSEncrypt对象
        let decrypt = new JSEncrypt();
        // 设置私钥
        decrypt.setPrivateKey(privateKey);
        // 解密数据
        return decrypt.decrypt(data);
    }
}
export let Rsa = new encryptedData();


