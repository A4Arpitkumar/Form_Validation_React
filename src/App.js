import logo from './logo.svg';
import './App.css';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import {useState} from 'react';


function App() {

    let [firstName,setFirstName] = useState([]);
    let [lastName,setLastName] = useState([]);
    let [age,setAge] = useState([]);
    let [email,setEmail] = useState([]);
    let [password,setPassword] = useState([]);
    let [mainData,setMainData] = useState([]);

    const onSubmit = () => {
      let obj = {
        firstName : firstName,
        lastName : lastName,
        age : age,
        email : email,
        password : password,
      }

      setMainData([...mainData,obj]);
    }

  let SignupSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    Age: yup.number().required().positive().integer().required(),
    email: yup.string().email(),
    Password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  });
  
  return (
    <div className='App'> 
    <div>
    <h1>Signup</h1>
     <Formik
       initialValues={{
         firstName: '',
         lastName: '',
         Age:'',
         email: '',
         Password:'',
       }}
       validationSchema={SignupSchema}
       onSubmit={values => {
         // same shape as initial values
         console.log(values);

         firstName = values.firstName;
         lastName = values.lastName;
         age = values.Age;
         email = values.email;
         password = values.Password;
       }}
     >
       {({ errors, touched }) => (
         <Form>
           FirstName:
           <Field name="firstName" />
           {errors.firstName && touched.firstName ? (
             <div>{errors.firstName}</div>
           ) : null}
           LastName:
           <Field name="lastName" />
           {errors.lastName && touched.lastName ? (
             <div>{errors.lastName}</div>
           ) : null}
           Age:
           <Field name="Age" />
           {errors.Age && touched.Age ? (
             <div>{errors.Age}</div>
           ) : null}
           
           Email:
           <Field name="email" type="email" />
           {errors.email && touched.email ? <div>{errors.email}</div> : null}
           Password:
           <Field name="Password" />
           {errors.Password && touched.Password ? (
             <div>{errors.Password}</div>
           ) : null}
           <button type="submit" onClick={onSubmit}>Submit</button>
         </Form>
       )}
     </Formik>
     </div>
     <div align='center' style={{marginTop:'20px'}}>
       <table border='2px solid black'>
         <tr>
           <th>FirstName</th>
           <th>LastName</th>
           <th>Age</th>
           <th>Email</th>
           <th>Password</th>
         </tr>
         {
           mainData.map((item)=>{
             return(
               <tr>
                 <td>{item.firstName}</td>
                 <td>{item.lastName}</td>
                 <td>{item.age}</td>
                 <td>{item.email}</td>
                 <td>{item.password}</td>
               </tr>
             )
           })
         }
       </table>
     </div>

    </div>
      
      
    
  );
}

export default App;
