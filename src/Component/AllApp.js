import React , {Component}  from 'react';
import {Redirect, Route , Switch } from 'react-router-dom'  ;
import axios  from 'axios';
import { toast } from "react-toastify";

import Error from './pageNotFound';
import Lists from './ToDoList/Lists';
import {Loadding} from './Loadding';


class AllApp extends Component {

    state = { 
        Lists : [
            {
                ToDo:[],
                InProcess:[],
                Done:[]
            }
        ],
        NewList:{
            Label : "",
            Level : " ",
            Subject : "",
            NotesText: "",
        },
        Notes: [
            
        ],  
        
        display:'none',
        showForm:false,
        ListType:'',
        SuccessAdding : this.props.SuccessAdding,
        Loadding : true
    }

    handleAddNewItem = async e =>{
        e.preventDefault();
        this.setState({display:'block' , showForm:true , ListType: e.currentTarget.id});
    }

    handleCloseForm = () => {
        console.log(this.state.showForm)
        this.setState({showForm:false})
        console.log(this.state.showForm)
    }
    
    handleDeleteList = async(listType , deleteId)=>{
        console.log("dddddddddddd" , listType , deleteId)

        if(listType !== 'Notes'){
            try{
                const List = {...this.state.Lists}[0]
            
                const key = Object.keys(List).filter(list => list === listType) ;
        
                List[key] = List[key].filter((List) => List.id !== deleteId )
                
                this.setState({List})
        
                // delete from db 
                await axios.delete("http://localhost:3000/"+listType+"/" + deleteId );
                toast.success("Delete Successfully" , {
                    position: "top-left",
                    pauseOnHover: true,
                });
            }
            catch(e){
                toast("Cant Delete");
            }
        }
        else{
            let notes = [...this.state.Notes];
            // delete from db
            try{
                await axios.delete("http://localhost:3000/Notes/" + deleteId).then((req)=>{
                    if(req.request.readyState === 4){
                        
                        notes = notes.filter((note)=> note.id !== deleteId )
                        this.setState({Notes:notes});

                        // Message
                        toast.success("Delete Successfully" , {
                            position: "top-left",
                            pauseOnHover: true,
                        });
                    }
                    else{
                        toast("Cant Delete");
                    }
                })
            
            }
            catch(e){
                toast("Cant Delete");
            }
            
        }
    }


    async componentDidMount() {

        const List = {...this.state.Lists}[0]        

        try{
            // Lists 
            let data = {} ;

            // eslint-disable-next-line array-callback-return
            Object.keys(List).map(List_ => {
                data[List_] =  axios.get("http://localhost:3000/" + List_)
                data[List_].then((data)=>{
                    List[List_] = data.data
                    this.setState({List})                    
                })
            })
            
            
        }

        catch(e){
            toast("Server Not Respond to Upload Data");
            this.setState({Loadding:true})
        }

        // Notes
        try{
            await axios.get("http://localhost:3000/Notes").then(Notes=>{
                this.setState({Notes:Notes.data})
            })
        }
        catch(e){
            toast("Server Not Respond to Upload Notes");
            this.setState({Loadding:true})
        }
        
    }
    
    
    //Loadding
    componentWillMount()

    {
        setTimeout(()=>{
            this.setState({Loadding:false})
        }
        ,  Loadding? 3000 :[Loadding] )
    }


    /* ********************************************** */
    // start function of Form

    handleListChange =(e) => {
        const List = {...this.state.NewList}
        List[e.currentTarget.name] = e.currentTarget.value
        this.setState({NewList:List})

    }

    handleCheckBox =(e) =>{
        //const NewList = this.state.List+ `.${type}` ;
        //console.log(NewList)
        const List = {...this.state.NewList}
        if(e.target.checked) {
            List.Level= e.currentTarget.id 
        };
        this.setState({NewList:List})
    }

    handle_Add_style_form = (e) => {
        const target = e.currentTarget.style
        target.boxShadow = 'none'
        target.border = 0
        target.borderBottom = '2px solid #333'
        target.textAlign = 'left'
    }

    handle_del_style_form = (e) => {
        const target = e.currentTarget.style

        target.borderBottom = 0
        target.border= '1px solid #ced4da';
    }

    handleSubmit = async (e) => {
        if(e.currentTarget.name !== "Notes"){

            const List = {...this.state.NewList}
            delete List.Notes ;
            const type = e.currentTarget.name 
            
            const RequestInfo = await axios.post("http://localhost:3000/"+ type  , {id:Math.random() ,...List} )
            if(RequestInfo.request.readyState === 4){
                // update All lists
                const NewLists = {...this.state.Lists}[0]
                const Lists = NewLists[Object.keys(NewLists).filter((listType)=>listType===type)]
                console.log("NewLists" , Lists )
                Lists.push(List);

                this.setState({
                    NewList:{
                        Label : "",
                        Level : " ",
                        Subject : "",
                        NotesText: ""
                    },
                })
                

                // close Form
                this.handleCloseForm();

                // Message Of Adding
                toast.success("Adding Successfully" , {
                    theme: 'dark',
                    position: "top-left"
                } )
            }
        }

        else{

            let NewNotes = {};
            const Notes = [...this.state.Notes] 
            const List = {...this.state.NewList}

            // eslint-disable-next-line array-callback-return
            Object.keys(List).map((key) => {if(key !== 'NotesText'){delete List[key] }})
            // change in db
            let id = Math.random();
            NewNotes = await axios.post("http://localhost:3000/Notes" , { id ,...List});

            if(NewNotes.request.readyState ===4 ){
                Notes.push({id:id , ...List})
                this.setState({Notes})

                // change newlist state
                this.setState({
                    NewList:{
                        Label : "",
                        Level : " ",
                        Subject : "",
                        NotesText: ""
                    },
                })

                // close Form
                this.handleCloseForm();

                // Message Of Adding
                toast.success("Adding Successfully" , {
                    theme: 'dark',
                    position: "top-left"
                } )
            }
            else{
            
                toast("Not Adding" , {
                    theme: 'dark',
                    position: "top-left"
                } )
            }
            

        }
        
    }

    
    /************************************************************************/
    // end function of form


    render() { 
        return ( 
            <>
                {this.state.Loadding 
                    ? <Loadding />
                    : console.log("no loading")
                }
                <Switch>

                    <Route
                        exact path='/' render={(props)=> (
                            <Lists  {...props}
                                    AllLists               = {this.state.Lists}
                                    Notes               = {this.state.Notes}
                                    handleDelete        = {this.handleDeleteList}

                                    // Show Form
                                    displayStyle        = {this.state.display}
                                    showForm            = {this.state.showForm}
                                    ListType            = {this.state.ListType}

                                    handleAddNewItem    = {this.handleAddNewItem}
                                    handleCloseForm     = {this.handleCloseForm}
                                
                                    List                    = {this.state.NewList}
                                    handleListChange        = {this.handleListChange}
                                    handleCheckBox          = {this.handleCheckBox}
                                    handle_Add_style_form   ={this.handle_Add_style_form}
                                    handle_del_style_form   ={this.handle_del_style_form}
                                    handleSubmit            = {this.handleSubmit}

                            >
                            </Lists>
                        )}
                    >
                    </Route>



                    <Route
                        path='/pageNotFound' component={Error}>
                    </Route>
                
                    <Redirect to="./pageNotFound" />

                
                </Switch> 
            </>
        
        );
        }
}

export default AllApp