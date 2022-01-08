import React , {Component} from "react";

import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// fontawsome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus , faCheckCircle as faCheckCircle_2 } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle ,  faTrashAlt as deleteIcon} from '@fortawesome/free-regular-svg-icons';


// Bootstrap
import {Button  , Card , Col}  from "react-bootstrap";

import Form from "./../DoListForm/form";


// images
import user2 from "./images/2.png"


class Lists extends Component {
    
    render() { 

        const {AllLists, Notes, handleDelete, handleAddNewItem ,displayStyle} = this.props
        const Lists = AllLists[0];

    
        return (  
            <>
                <div className={`d-${displayStyle}`}> {
                    <Form   
                        List                    = {this.props.List}
                        ListType                = {this.props.ListType}
                        showForm                = {this.props.showForm}
                        handleCloseForm         = {this.props.handleCloseForm}
                        handleListChange        = {this.props.handleListChange}
                        handleCheckBox          = {this.props.handleCheckBox}
                        handle_Add_style_form   ={this.props.handle_Add_style_form}
                        handle_del_style_form   ={this.props.handle_del_style_form}
                        handleSubmit            = {this.props.handleSubmit}
                    />
                }
                </div>

                <div className="List bg-light" style={{height:'100vh'}}>
                    <div className="container-fluid p-0"> 
                        <div className="teamBoard w-100 bg-white p-3 mb-5 text-center">
                            <h3 className="d-inline-block">  Team Board</h3>

                            
                        </div>
                    </div>                     
                    <ToastContainer/>
                    
                    <div className="container-fluid bg-light p-0 text-left" >

                        <div className="row m-0">
                            {
                                Object.keys(Lists).map((list,i)=>(
                                    
                                    <Col lg={3} sm={6} xs={12} className="my-2 mt-5" key={Math.random()}>
                                        <header as="h5" className="p-0 pt-2 px-2">
                                            <p className="user_name d-inline-block" > {list} </p>
                                            <p className="user_name" style={{float:'right'}}> 
                                                <FontAwesomeIcon icon={faPlus}/>
                                            </p>
                                        </header>
                                            {
                                            Object.keys(Lists[list]).length ? 
                                                Object.keys(Lists[list]).map((item) => (
                                                    
                                                    <Card className="border-light shadow-sm mb-2" key={Lists[list][item].id}>    
                                                    <Card.Body>
                                                        <Card.Title className="mb-3">
                                                            {Lists[list][item].Type==="Done" 
                                                                ? <FontAwesomeIcon icon={faCheckCircle_2} color="#666" className="mx-2"/>
                                                                : <FontAwesomeIcon icon={faCheckCircle} color="#666" className="mx-2"/>
                                                                    
                                                            }    
                                                            {Lists[list][item].Subject}
                                                        
                                                        </Card.Title>                                
                                                    
                                                        <Button variant="primary mx-2 my-3 p-0 px-3 rounded-pill"> {Lists[list][item].Level}</Button>
                                                        <Button variant="warning my-3 p-0 px-3 rounded-pill"> {Lists[list][item].Label}</Button>
                                                        
                                                        <Button variant="danger mx-2 p-0 px-3 rounded-pill" onClick={() => handleDelete(list , Lists[list][item].id)}> 
                                                            <FontAwesomeIcon icon={deleteIcon }/>
                                                            <span className="p-2"> Delete</span> 
                                                        </Button>
                                                    </Card.Body>
                    
                                                    <Card.Footer className="text-muted bg-white" >
                                                        <span className="userPhoto">  <img src={user2} alt="user2" /></span>
                                                        <span className="username px-2">  thursday</span>
                                                    </Card.Footer>  
                                                                    
                                            
                                                </Card>
                                                
                                                ))
                                                    : 
                                                    
                                                    <div className="alert alert-danger"> No Lists </div> 
                                                
                                            }
                                            <Button type="button" variant="light text-muted " 
                                                    className="btn mt-3 w-100"  id={list}
                                                    onClick = {handleAddNewItem}
                                                >
                                                <FontAwesomeIcon  icon={faPlus}/>
                                                <span className="px-2"> Add New Task</span>
                                            </Button>
                                    </Col>
                    
                                ))
                            }

                            {    
                                <Col lg={3} className="lg-fs-2 mt-5 my-2" sm={6} xs={12} >
                                    <header as="h5" className="p-0 pt-2 px-2">
                                        <p className="user_name d-inline-block" > Notes & Refernces  </p>
                                        <p className="user_name" style={{float:'right'}}> 
                                            <FontAwesomeIcon icon={faPlus}/>
                                        </p>
                                    </header>
                                    
                                    {Notes.length === 0 
                                        ? <div className="alert alert-danger"> No Notes </div> 

                                        : Notes.map(item => (
                                            <Card className="border-light text-left shadow-sm my-2" key={Math.random()}>
                                                <Card.Body>
                                                    <h5 className="card-title ">
                                                        <span style={{float: "left"}}>

                                                            <FontAwesomeIcon icon={faCheckCircle} color="#666" className="mx-2" />
                                                            {item.NotesText}
                                                        </span>
                                                        <span style={{float: "right"}} onClick={()=> handleDelete("Notes" , item.id)} >
                                                                <FontAwesomeIcon icon={deleteIcon} color="#dc3545"/>
                                                        </span>

                                                    
                                                    </h5>
                                                </Card.Body>
                                            </Card>
                                        ))

                                    }
                            
                                    <Button type="submit" variant="light text-muted " className="btn mt-3 w-100" id="Notes"  onClick={handleAddNewItem}>
                                        <FontAwesomeIcon  icon={faPlus}/>
                                        <span className="px-2"> Add New Notes</span>
                                    </Button> 
                                
                                </Col>
                            }
                            
                        </div>
                        
                        
                    </div>
                </div> 

            </>
        );
    }}


export default Lists;