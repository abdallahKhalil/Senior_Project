import styles from './Wallet.module.css';
import {React, useState} from 'react'


const SendReceive = (props) => {

    const [transferHash, setTransferHash] = useState(null);

    const [transaction, setTransaction] = useState([]);

    

    const transferHandler = async(e) => {
        e.preventDefault();

        let senderAmount = e.target.sendAmount.value;
        let receiverAddress = e.target.receiverAddress.value;

        let txt = await props.contract.transfer(receiverAddress,senderAmount);
        

        console.log(txt);
        

        setTransferHash("Transfer confirmation Hash: " + txt.hash);
        setTransaction(prev =>[...prev,
        {
            id: prev.length,
            address: receiverAddress,
            amount: senderAmount,
        }
        ])

        console.log(transaction);


    }
    return(
        <div>
            <div className={styles.SendReceiveCard}>
                <form onSubmit={transferHandler}>

                    <h3> Transfer Tokens </h3>
                    <p> Receiver Address </p>
                    <input type="text" id="receiverAddress" className={styles.addressInput} />

                    <p> Send Amount </p>
                    <input type='number' id='sendAmount' min='0' step='1' />

                    <button type='submit' className={styles.button6}>Send</button>

                    <div>
                        {transferHash}
                    </div>

                </form>


            </div>
            <div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Receiver Address</th>
                            <th>value</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                            {
                                transaction.map(trans => 
                                    <tr key={trans.id}>
                                        <td>{trans.address}</td>
                                        <td>{trans.amount}</td>
                                    </tr>
                                    )
                            }
                        
                        </tbody>
                </table>
            </div>

        </div>
        
    );
}
export default SendReceive;