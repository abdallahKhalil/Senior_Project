import {React, useState, useEffect} from 'react'
import {ethers} from 'ethers'
import careToken_abi from './contracts/careToken_abi.json';
import styles from './Wallet.module.css';
import SendReceive from './SendReceive';
import caretokenlogo from './caretoken.png';
  

const Wallet = () => {
     //CareToken Address toked from Remix API
    let contractAddress ='0xAc58e21D345da4977c2be910d4d8E15495044732';
    //This error message is for connecting metamask to careWallet
    const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null); //the default account is the one toked from Ganache to metamask
	const [connButtonText, setConnButtonText] = useState('Connect Wallet'); //is the button responsible for connecting CareWallet with metamask

    const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null); 

	const [tokenName, setTokenName] = useState("Token"); //setting token name 
	const [balance, setBalance] = useState(null); // setting balance

    const [showImage, setShowImage] = useState(false); //to hide and display the image
    
    const connectWalletHandler = () => { //to make sure the wallet that is used is metamask
        if (window.ethereum && window.ethereum.isMetaMask) {

            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(result => {
                    accountChangedHandler(result[0]);
                    setConnButtonText('Wallet Connected');
                })
                .catch(error => {
                    setErrorMessage(error.message);

                });

        } 
        else {
            console.log('Need to install MetaMask');
            setErrorMessage('Please install MetaMask browser extension to interact');
        }
       setShowImage(true);
    }
    
    // update account
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		updateEthers();
    }
    const updateBalance = async () => {
		let balanceBigN = await contract.balanceOf(defaultAccount);
		let balanceNumber = balanceBigN.toNumber();

		let tokenDecimals = await contract.decimals();

		let tokenBalance = balanceNumber / Math.pow(10, tokenDecimals);

		setBalance(toFixed(tokenBalance));	


	}
   //this function is made to return the balance with 2 decimals
    function toFixed(x) {
        if (Math.abs(x) < 1.0) {
            var e = parseInt(x.toString().split('e-')[1]);
            if (e) {
                x *= Math.pow(10, e - 1);
                x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
            }
        } 
        else {
            e = parseInt(x.toString().split('+')[1]);
            if (e > 20) {
                e -= 20;
                x /= Math.pow(10, e);
                x += (new Array(e + 1)).join('0');
            }
        }
        return x;
    }
  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
}

// listen for account changes
window.ethereum.on('accountsChanged', accountChangedHandler);

window.ethereum.on('chainChanged', chainChangedHandler);

const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(contractAddress, careToken_abi, tempSigner);
    setContract(tempContract);	
}

useEffect(() => {
    if (contract != null) {
        updateBalance();
        updateTokenName();
    }
}, [contract]);

const updateTokenName = async () => {
    setTokenName(await contract.name());
}

    return (
        
        <div className={styles.wallet}>
            <div>
            <h2> {tokenName + " ERC-20 Wallet"} </h2>
            </div>
            <button className={styles.button6} onClick={connectWalletHandler}>{connButtonText}</button>
            <div>
                {
                    showImage ? <img src={caretokenlogo} alt="logo" hight={150} width={150} /> : null //if show is true display the image
                }
            </div>
            <div className={styles.walletCard}>
                <div>
                    <h3>Address: {defaultAccount}</h3>
                </div>

                <div>
                    <h3>{tokenName} Balance: {balance}</h3>
                </div>

                {errorMessage}
            </div>
            <SendReceive contract={contract} />


        </div>
        
    );
}

export default Wallet;