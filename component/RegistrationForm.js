import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import firebaseApp from '../firebaseConfig';
import { collection, ref, push, addDoc, setDoc, doc, docs, getDocs, deleteDoc, arrayUnion, getDoc, updateDoc, query, Timestamp } from "firebase/firestore";
import { getFirestore, onSnapshot } from "firebase/firestore";
import Router from 'next/router';
import Link from 'next/link'
import Header from "../component/module/Header"

const db = getFirestore();

//Image import
import topbannerimg from '../public/images/topbanner.png';
import walogo from '../public/images/whatsapp.png'



// const twocheckdata = [
//     { name: "Integrity" },
//     { name: "Responsibility" },
//     { name: "Selfless" },
//     { name: "Fairness" },
  
    
// ];

const threecheckdata = [
    { name: "Identify opportunities" },
    { name: "Identify constraints that limiting your opportunities" },
    { name: "Provide Authentic Listening" },
    { name: "Empower to bring in Openness" },

 
    
];

const fivecheckdata = [
    { name: "Helping people to improve relationships" },
    { name: "Sharing tips for being healthy" },
    { name: "Helping partners to identify referrals" },
    { name: "Enrolling own Connects to become Partner" },
 

];



const RegistrationForm = ()=> {
    const [phoneNum, setphoneNum] = useState('')
    const [username, setusername] = useState('')
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [singleUsers, setsingleUsers] = useState('');
    const [singleAdminUsers, setsingleAdminUsers] = useState('');

    // questions state

    const [onecheck, setoneCheck] = useState('');
    const [twocheck, setTwoCheck] = useState("");
    const [threecheck, setThreeCheck] = useState(threecheckdata);
    const [fourcheck, setFourCheck] = useState("");
    const [fivecheck, setFivecheck] = useState(fivecheckdata);
    const [sixcheck, setSixCheck] = useState("");
   
    const [showInputTwo, setShowInputTwo] = useState(false);
    const [showInputThree, setShowInputThree] = useState(false);
    // const [showInputFour, setShowInputFour] = useState(false);
    // const [showInputFive, setShowInputFive] = useState(false);

    const [oneQuestionInput, setOneQuestionInput] = useState("");
    const [twoQuestionInput, setTwoQuestionInput] = useState("");
    const [threeQuestionInput, setThreeQuestionInput] = useState("");
    // const [fourQuestionInput, setFourQuestionInput] = useState("");
    // const [fiveQuestionInput, setFiveQuestionInput] = useState("");
 


    const [UserData, setUserData] = useState([]);
    const [userId, setuserId] = useState('');
    const [error, seterror] = useState(false);
    const [formsubmit, setformsubmit] = useState(false);
    const [formbgImage, setformbgImage] = useState('');
    const [mobileFormbg, setmobileFormbg] = useState('')
    const [eventName, seteventName] = useState('');

    // condition for input
 
 
    const [whatsappgroup, setwhatsappgroup] = useState("");


  //function for add data in firebase
  const HandleSubmitForm = async (event) => {
    event.preventDefault();

    const isLogin = localStorage.getItem("ucore");
    const usersDetails = JSON.parse(isLogin);
    console.log(usersDetails);

    const data = {
        username: username,
        phoneNum: phoneNum,
        PreOneAns: onecheck,
        preOneInput: oneQuestionInput,
        PreTwoAns: twocheck,
        preTwoInput:twoQuestionInput,
        PreThreeAns: threecheck,
        preThreeInput:threeQuestionInput,
        PreFourAns: fourcheck,
        // preFourInput:fourQuestionInput,  
        PreFiveAns: fivecheck,    
        PreSixAns: sixcheck,    
        // preFiveInput:fiveQuestionInput,
        preFormSubmit: true,
        createdBy:Timestamp.now(),

    };

    //if user empty throw error else merge the form data in firebase
    if (onecheck==="" || twocheck==="" || threecheck==="" || fourcheck==="" || fivecheck==="" || sixcheck==="" )
    {
        seterror(true);
        
        
        setThreeCheck(threecheckdata);
        setFivecheck(fivecheckdata);
        // setFourCheck(fourcheckdata);
    }
    else {

        const isLogin = localStorage.getItem("ucore");
        const usersDetails = JSON.parse(isLogin);
        setformbgImage();
        const docRef = doc(db, usersDetails.eventName, phoneNum);
        await setDoc(docRef, data, { merge: true });

        // const docSnap = await getDoc(docRef);
        console.log("Form data", data);
        setformsubmit(true);

    };

    // clear all field after submit the data
    setoneCheck("");
    setOneQuestionInput("");
    setTwoCheck("");
    setTwoQuestionInput("");
    setThreeCheck(threecheck);
    setThreeQuestionInput("");
    setFourCheck("");
    // setFourQuestionInput("");
    setFivecheck(fivecheck);
    setSixCheck("");
    // setFiveQuestionInput("");



}

    //target checked data for store in firestore
    const questionOne = (event) => {
        const target = event.target;
        if (target.checked) {
            setoneCheck(target.value);
            console.log(event.target.value);
        }

    };

    const questionTwo = (e) => {
        const target = event.target;
        if (target.checked) {
            setTwoCheck(target.value);
            console.log(event.target.value);
        }

    };

    // const handleshowtwo = () => {
    //     setShowInputTwo(true);

    // };

    const questionThree = (e) => {
        const {name,checked}= e.target;
        //     if(name === "AllSelect"){
        //       let tempSevenData=sevencheck.map((sevendetails)=>{
        //             return {...sevendetails, isChecked:checked}  });
        //         setSevenCheck(tempSevenData);
    
        //     }
        //    else{
            let tempThreeData=threecheck.map((threedetails)=>
            threedetails.name === name ? { ...threedetails, isChecked:checked } : threedetails);
            setThreeCheck(tempThreeData);
            setShowInputThree(false);
    
            console.log("threequestion",threecheck);
        //    }
           
            

    };
    const handleshowthree = () => {
        setShowInputThree(true);

    };

    const questionFour = (event) => {
        const target = event.target;
        if (target.checked) {
            setFourCheck(target.value);
            console.log(event.target.value);
        }

    };

    
    // const handleshowfour = () => {
    //     setShowInputFour(true);

    // };
    const questionFive = (event) => {
        const {name,checked}= event.target;
        //     if(name === "AllSelect"){
        //       let tempSevenData=sevencheck.map((sevendetails)=>{
        //             return {...sevendetails, isChecked:checked}  });
        //         setSevenCheck(tempSevenData);
    
        //     }
        //    else{
            let tempFiveData=fivecheck.map((fivedetails)=>
            fivedetails.name === name ? { ...fivedetails, isChecked:checked } : fivedetails);
            setFivecheck(tempFiveData);
            // setShowInputThree(false);
    
            console.log("fivequestion",fivecheck);
        //    }
           
            
    };

    
    const questionSix = (event) => {
        const target = event.target;
        if (target.checked) {
            setSixCheck(target.value);
            console.log(event.target.value);
        }

    };
  
   
    // useEffect(() =>{
    //     setTwoCheck(twocheckdata);

    // },[])

    useEffect(() =>{
        setThreeCheck(threecheckdata);

    },[])
    useEffect(() =>{
        setFivecheck(fivecheckdata);

    },[])
    
    // useEffect(() =>{
    //     setFourCheck(fourcheckdata);

    // },[])
    
    
   

useEffect(() => {
    const isLogin = localStorage.getItem("ucore");
    const usersDetails = JSON.parse(isLogin);
    console.log(usersDetails);


    console.log(usersDetails.username);
    console.log(usersDetails.phoneNum);
    setusername(usersDetails.username);
    setphoneNum(usersDetails.phoneNum);
    seteventName(usersDetails.eventName);

    const eventName = usersDetails.eventName;

    console.log(eventName);


    setLoading(true);

    // if(preFormSubmit){

    // Router.push("/dashboard");

    // }else{

    // }

    const getsingleDoc = async () => {

        const isLogin = localStorage.getItem("ucore");
        const usersDetails = JSON.parse(isLogin);
        console.log(usersDetails);
        const FormEventName = usersDetails.eventName;
        const FormPhoneNumber = usersDetails.phoneNum;


        const docRef = doc(db, FormEventName, FormPhoneNumber);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data());

        if (docSnap.exists()) {
            setsingleUsers(docSnap.data());
            console.log(singleUsers);
            console.log("Document data:", docSnap.data());
            const prefillformsubmit = docSnap.data().preFormSubmit;
            if (prefillformsubmit) {

                Router.push("/dashboard");
            } else {

                // alert("kindly fill the form");
            }


        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }

    }

    const getSingleAdminDoc = async () => {

        const isLogin = localStorage.getItem("ucore");
        const usersDetails = JSON.parse(isLogin);
        console.log(usersDetails);

        const docRef = doc(db, "AdminMonthlyMeet", eventName);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setsingleAdminUsers(docSnap.data());
            console.log(singleAdminUsers);
            console.log("Admin Document data:", docSnap.data());
            //   console.log("Admin Document data:", docSnap.data().formimage);
            setformbgImage(docSnap.data().formImgUrls);
            setmobileFormbg(docSnap.data().mobileUrls);
            setwhatsappgroup(docSnap.data().whatsappLink);
            seteventName(docSnap.data().eventName);
            console.log(docSnap.data().whatsappLink);

            console.log(eventName);

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }



    }
    // getContent();
    getsingleDoc();
    getSingleAdminDoc();
}, []);

  return (
    <>

         <Header/>

        <section className="c-containerForm">

    <div className='topbanner'>
        <img className='desktopFormbg' src={formbgImage} />
        <img className='mobileFormbg' src={mobileFormbg} />

      
        {/* <Image src={topbannerimg} placeholder="blur" alt='logo' /> */}
        <div className="bannertext">
            <h1>{eventName}</h1>
        </div>
    </div>



    {/* form start  */}

    {
        formsubmit ?
            <div className="sucess">
                <h2> Thank you for sharing your responses.</h2>
                <h4> Kindly join the WhatsApp Group </h4>
                <div className='whatsappLink'>
                    <div className='walogo'>
                        <Image src={walogo} layout='responsive' />
                    </div>
                    <Link href={whatsappgroup} ><a className="whatsappbtn">Join WhatsApp Group</a></Link>
                </div>
                <Link href="/dashboard" ><a className="homelink">Go back to home to get zoom meeting link</a></Link>
            </div> : <div>
                <form onSubmit={HandleSubmitForm}>

                    <h2 className='h2'>
                        Fill this form to get introduce yourself to your own Responsibility
                    </h2>
                    {/* {
                error?<div className="error"><p>required</p></div>:null
                } */}
                    <div className="form-row">
                        <ul className="form-textfield">
                            <label>Name</label>
                            <li>
                                <input type="text"
                                    value={username}
                                    name="questionOne"
                                    disabled
                                    onChange={(event) => {
                                        setusername(event.target.value)
                                    }} />

                            </li>

                        </ul>
                    </div>

                    <div className="form-row">
                        <ul className="form-textfield">
                            <label>Phone Number</label>
                            <li>
                                <input type="text"
                                    value={phoneNum}
                                    name="questionOne"
                                    disabled
                                    onChange={(event) => {
                                        setphoneNum(event.target.value)
                                    }} />

                            </li>

                        </ul>
                    </div>

                    {/* 1st question */}
                        <div className="form-row radio-buttons">
                            <h2>1. Are you ‘Open’ for conversation with each and every one ?<sup>*</sup></h2>
                            <ul>

                                <li>

                                    <label htmlFor="1A">
                                        <input
                                            id="1A"
                                            value="Yes"
                                            name="questionOne"
                                            type="radio"
                                            onChange={questionOne}
                                            checked={onecheck == 'Yes'} />
                                        <div className='custom_radio'></div>
                                        Yes </label>
                                </li>
                                <li>
                                    <label htmlFor="1B">
                                        <input
                                            id="1B"
                                            value="No"
                                            name="questionOne"
                                            type="radio"
                                            onChange={questionOne}
                                            checked={onecheck == 'No'} />
                                        <div className='custom_radio'></div>
                                        No</label>
                                </li>

                                

                                {onecheck==="No" && (  <li>
                                        <input type="text"
                                             id="oneInput"
                                            value={oneQuestionInput}
                                            name="questionOne"
                                            placeholder='Share reason '
                                            required
                                            onChange={(event) => {
                                                setOneQuestionInput(event.target.value)
                                            }} />
                                </li> )}

                            </ul>
                            {
                                error ? <div className="error"><p>this is required</p></div> : null
                            }

                        </div>


                        {/* 2nd question */}
                        <div className="form-row radio-buttons">
                            <h2>2. Do you believe that limited openness limits opportunities?<sup>*</sup></h2>

                            <ul>
                                <li>
                                    <label htmlFor="2A">
                                        <input
                                            id="2A"
                                            value="Yes"
                                            name="questionTwo"
                                            type="radio"
                                            onChange={questionTwo}
                                            checked={twocheck == 'Yes'} />
                                        <div className='custom_radio'></div>
                                        Yes
                                    </label>

                                </li>

                                <li>
                                    <label htmlFor="2B">
                                        <input
                                            id="2B"
                                            value="No"
                                            name="questionTwo"
                                            type="radio"
                                            onChange={questionTwo}
                                            checked={twocheck == 'No'} />
                                        <div className='custom_radio'></div>
                                        No</label>
                                </li>

                                {twocheck==="No" && (  <li>
                                    <input type="text"
                                            id="twoInput"
                                        value={twoQuestionInput}
                                        name="questionTwo"
                                        placeholder='Share your 2 reason'
                                        required
                                        onChange={(event) => {
                                            setTwoQuestionInput(event.target.value)
                                        }} />
                            </li> )}

                            </ul>
                            {
                                error ? <div className="error"><p>this is required</p></div> : null
                            }

                        </div>

                     {/* 2nd question */}

                        {/* <div className="form-row radio-buttons">
                            <h2>2. Do you believe that limited openness limits opportunities?</h2>
                            <ul>
                            <li >
                                    {twocheck && twocheck.map((twodata)=>(
                                    <>

                                    <div > 
 
                                                <input

                                                    id={twodata.name}
                                                    value={twodata}
                                                    name={twodata.name}
                                                    checked={twodata?.isChecked || false }
                                                    type="checkbox"
                                                    // required
                                                    onChange={questionTwo} />
                                            
                                                <label  className='checkbox-label' htmlFor={twodata.name}> {twodata.name} </label>
                                    </div>
                                    </>
                                    ))}
                                </li>
                                                                    
                                <li>
                                <label className=''><button className='checkbox-input-btn' onClick={(e) => handleshowtwo(e)}>None of the above</button></label>

                                        {showInputTwo ?
                                
                                    <input type="text"
                                        id="twoInput"
                                        value={twoQuestionInput}
                                        name="questionTwo"
                                        placeholder='Answer input'
                                        required
                                        onChange={(event) => {
                                            setTwoQuestionInput(event.target.value)
                                        }} />:null}
                                </li> 
                                  
                              
                            </ul>
                            {
                                error ? <div className="error"><p>this is required</p></div> : null
                            }

                        </div> */}

                        {/* 3nd question */}
                        <div className="form-row radio-buttons">
                            <h2>3. In which of the below mentioned areas you need immediate help/support from the Nucleus Team?<sup>*</sup> </h2>
                            <ul>

                                <li >
                                    {threecheck && threecheck.map((threedata)=>(
                                    <>

                                    <div > 
 
                                                <input
                                                    id={threedata.name}
                                                    value={threedata}
                                                    name={threedata.name}
                                                    checked={threedata?.isChecked || false }
                                                    type="checkbox"
                                                    // required
                                                    onChange={questionThree} />
                                            
                                                <label  className='checkbox-label' htmlFor={threedata.name}> {threedata.name} </label>
                                    </div>
                                    </>
                                    ))}
                                </li>

                                <li>
                                <label className=''><button className='checkbox-input-btn' onClick={(datathree) => handleshowthree(datathree)}>None of the above</button></label>

                            { showInputThree ?
                                
                                <input type="text"
                                    id="threeInput"
                                    value={threeQuestionInput}
                                    name="questionThree"
                                    placeholder='Answer input'
                                    required
                                    onChange={(event) => {
                                        setThreeQuestionInput(event.target.value)
                                    }} />:null}
                                </li> 


                               

                             
                    

                               

                            </ul>
                            {
                                error ? <div className="error"><p>this is required</p></div> : null
                            }

                        </div>

                        {/* 4th question */}
                        <div className="form-row radio-buttons">
                                <h2>4. What kind of opportunities you see within UJustBe?<sup>*</sup></h2>
                                <ul>

                                    <li>
                                        <label htmlFor="4A">
                                            <input
                                                id="4A"
                                                value="Empowering Self to build Relationship"
                                                name="questionFour"
                                                type="radio"
                                                onChange={questionFour}
                                                checked={fourcheck == 'Empowering Self to build Relationship'} />
                                            <div className='custom_radio'></div>
                                            Empowering Self to build Relationship</label>
                                    </li>

                                    <li>
                                        <label htmlFor="4B">
                                            <input
                                                id="4B"
                                                value="Empowering Self to improve Health"
                                                name="questionFour"
                                                type="radio"
                                                onChange={questionFour}
                                                checked={fourcheck == 'Empowering Self to improve Health'} />
                                            <div className='custom_radio'></div>
                                            Empowering Self to improve Health </label>
                                    </li>

                                    <li>
                                        <label htmlFor="4C">
                                            <input
                                                id="4C"
                                                value="Creating Wealth"
                                                name="questionFour"
                                                type="radio"
                                                onChange={questionFour}
                                                checked={fourcheck == 'Creating Wealth'} />
                                            <div className='custom_radio'></div>
                                            Creating Wealth</label>
                                    </li>

                                    <li>
                                        <label htmlFor="4D">
                                            <input
                                                id="4D"
                                                value="All of the Above "
                                                name="questionFour"
                                                type="radio"
                                                onChange={questionFour}
                                                checked={fourcheck == 'All of the Above '} />
                                            <div className='custom_radio'></div>
                                            All of the Above </label>
                                    </li>

                                   

                                </ul>
                                {
                                    error ? <div className="error"><p>this is required</p></div> : null
                                }
                            </div>

                        {/* 4th question
                        <div className="form-row radio-buttons">
                            <h2>4. What kind of opportunities you see within UJustBe?</h2>
                            <ul>

                            <li className='checkbox-style'>
                                    {fourcheck && fourcheck.map((fourdata)=>(
                                    <>

                                    <div > 
 
                                                <input

                                                    id={fourdata.name}
                                                    value={fourdata}
                                                    name={fourdata.name}
                                                    checked={fourdata?.isChecked || false }
                                                    type="checkbox"
                                                    // required
                                                    onChange={questionFour} />
                                            
                                                <label  className='checkbox-label' htmlFor={fourdata.name}> {fourdata.name} </label>
                                    </div>
                                    </>
                                    ))}
                                </li>

                                <li>
                                <label className=''><button  className='checkbox-input-btn' onClick={() => handleshowfour()}>None of the above</button></label>

                                {showInputFour ?
                                
                                    <input type="text"
                                        id="fourInput"
                                        value={fourQuestionInput}
                                        name="questionFour"
                                        placeholder='Answer input'
                                        required
                                        onChange={(event) => {
                                            setFourQuestionInput(event.target.value)
                                        }} /> : null}
                                </li> 

                           
                    
                            </ul>
                            {
                                error ? <div className="error"><p>this is required</p></div> : null
                            }

                        </div> */}

                         {/* 5th question */}
                         <div className="form-row radio-buttons">
                            <h2>5. Given an opportunity, in which areas will you like to contribute in UJustBe?<sup>*</sup> </h2>
                            <ul>

                            <li className='checkbox-style'>
                                    {fivecheck && fivecheck.map((fivedata)=>(
                                    <>

                                    <div > 
 
                                                <input

                                                    id={fivedata.name}
                                                    value={fivedata}
                                                    name={fivedata.name}
                                                    checked={fivedata?.isChecked || false }
                                                    type="checkbox"
                                                    // required
                                                    onChange={questionFive} />
                                            
                                                <label  className='checkbox-label' htmlFor={fivedata.name}> {fivedata.name} </label>
                                    </div>
                                    </>
                                    ))}
                                </li>

                                {/* <li>
                                <label className=''><button  className='checkbox-input-btn' onClick={() => handleshowfour()}>None of the above</button></label>

                                {showInputFour ?
                                
                                    <input type="text"
                                        id="fiveInput"
                                        value={fiveQuestionInput}
                                        name="questionFive"
                                        placeholder='Answer input'
                                        required
                                        onChange={(event) => {
                                            setFiveQuestionInput(event.target.value)
                                        }} /> : null}
                                </li>  */}
                                
                             
                          

                               

                            </ul>
                            {
                                error ? <div className="error"><p>this is required</p></div> : null
                            }

                        </div>

                        {/* 6th question */}
                        <div className="form-row radio-buttons">
                            <h2>6. Which of the below roles that you play in UJustBe requires Openness?<sup>*</sup>  </h2>
                            <ul>

                                <li>

                                    <label htmlFor="6A">
                                        <input
                                            id="6A"
                                            value="Partner"
                                            name="questionSix"
                                            type="radio"
                                            onChange={questionSix}
                                            checked={sixcheck == 'Partner'} />
                                        <div className='custom_radio'></div>
                                        Partner </label>
                                </li>
                                <li>
                                    <label htmlFor="6B">
                                        <input
                                            id="6B"
                                            value="Listed Partner"
                                            name="questionSix"
                                            type="radio"
                                            onChange={questionSix}
                                            checked={sixcheck == 'Listed Partner'} />
                                        <div className='custom_radio'></div>
                                        Listed Partner</label>
                                </li>

                                <li>
                                    <label htmlFor="6C">
                                        <input
                                            id="6C"
                                            value="Mentor"
                                            name="questionSix"
                                            type="radio"
                                            onChange={questionSix}
                                            checked={sixcheck == 'Mentor'} />
                                        <div className='custom_radio'></div>
                                        Mentor </label>
                                </li>
                                <li>
                                    <label htmlFor="6D">
                                        <input
                                            id="6D"
                                            value="All of the above"
                                            name="questionSix"
                                            type="radio"
                                            onChange={questionSix}
                                            checked={sixcheck == 'All of the above'} />
                                        <div className='custom_radio'></div>
                                        All of the above </label>
                                </li>

                             
                                
                             
                          

                               

                            </ul>
                            {
                                error ? <div className="error"><p>this is required</p></div> : null
                            }

                        </div>

                      

                    
                    


                    {/* submit button */}
                    <div>
                        <button
                            type="submit"
                            // onClick={CreatForm}
                        >Submit
                        </button>
                    </div>

                </form>
            </div>
    }

    {/* form end here */}

        </section>
    </>
  )
}

export default RegistrationForm