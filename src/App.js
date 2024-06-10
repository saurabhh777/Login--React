import { useEffect, useState } from "react";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {

  const initialValues={username:'',email:'',password:''};
  const [formValues,setFormValues]=useState(initialValues);
  const [formErrors,setFormErrors]=useState({});
  const [isSubmit,setIsSubmit]=useState(false);

  const handleChange=(e)=>{
    const {name,value}=e.target
    setFormValues(prevState => ({...prevState,[name]:value}));
  }

  const handleSubmit=(e) =>{
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true)
  }

  useEffect(()=>{
    if(Object.keys(formErrors).length === 0 && isSubmit){
      console.log(formValues)
    }
  },[formErrors, formValues, isSubmit]);

  const validate=(values)=>{
   const errors={}
   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; 
   if(!values.username){
    errors.username="Username is required!"
   }
   if(!values.email){
    errors.email="Email is required!"
   }else if (!regex.test(values.email)) {
    errors.email = "This is not a valid email format!";
  }
   if(!values.password){
    errors.password="password is required!"
   }else if (values.password.length < 4) {
    errors.password = "Password must be more than 4 characters";
  } else if (values.password.length > 10) {
    errors.password = "Password cannot exceed more than 10 characters";
  }
   return errors;
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1 className="ui-center">Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Username</label>
            <input type="text" className="form-control" name="username" placeholder="Username"  value={formValues.username} onChange={handleChange}/>
          </div>
          <p>{formErrors.username}</p>
          <div className="field">
            <label>Email</label>
            <input type="email" className="form-control" name="email" placeholder="email"  value={formValues.email} onChange={handleChange}/>
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Password</label>
            <input type="password" className="form-control" name="password" placeholder="password"  value={formValues.password} onChange={handleChange} />
          </div>
          <p>{formErrors.password}</p>
          <div className="field mt-3 ui-center w-100">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
