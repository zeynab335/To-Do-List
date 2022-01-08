import { Modal }  from "react-bootstrap";
import React , {useState} from "react"

// css of loadding 
import './css/loadding.css'


export const Loadding = React.memo((props) => {
    
    console.log(props.Loadding)
    const [show , setShow] = useState(true);

    if(props.Loadding){
        setShow(true);
    }
    
    return ( 
        <>  
            <Modal
                show = {show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="loadding"
                >
                <Modal.Body style={{textAlign:"center" , border:0, backgroundColor:"none"}}>
                    <div className="lds-dual-ring"></div>

                </Modal.Body>

            </Modal>
        </>

        );
})


