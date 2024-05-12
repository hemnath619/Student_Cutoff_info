
import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import "./home.css";

const Home = () => {
  const [Studentdata, setStudentdata] = useState({ name: "", email: "", dob: "", mm: "", cm: "", pm: "", cutoff: 0, });

  const inputhandler = (e) => {
    const { name, value } = e.target;
    let cutoff = 0;
    if (name === "mm" || name === "cm" || name === "pm") {
      if (parseInt(value) > 100) {
        toast.error("Marks should be less than or equal to 100");
        return;
      }
      const mm = parseInt(name === "mm" ? value : Studentdata.mm);
      const cm = parseInt(name === "cm" ? value : Studentdata.cm);
      const pm = parseInt(name === "pm" ? value : Studentdata.pm);
      cutoff = (mm + cm + pm);
    }
    setStudentdata((prevData) => ({ ...prevData, [name]: value, cutoff }));
  }

  const submitInput = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:4000/Student-data", Studentdata);
    setStudentdata({ name: "", email: "", dob: "", mm: "", cm: "", pm: "", cutoff: 0 });
    if (response.status === 200) {
      toast.success(response.data.message);
    }
    else { toast.error("Data not saved") }
  }

  
  return (<>
    <div class="form_wrapper">
      <div class="form_container">
        <div class="title_container">
          <h2>Student Result</h2>
        </div>
        <div class="row clearfix">
          <div class="">
            <form>
              <div class="input_field"> <span><i aria-hidden="true" class="fa fa-user-circle"></i></span>
                <input type="text" name="name" value={Studentdata.name} onChange={inputhandler} placeholder="Name" required />
              </div>
              <div class="input_field"> <span><i aria-hidden="true" class="fa fa-envelope"></i></span>
                <input type="email" name="email" value={Studentdata.email} onChange={inputhandler} placeholder="Email" required />
              </div>

              <div class="input_field"> <span><i aria-hidden="true" class="fa fa-birthday-cake" ></i></span>
                <input type="date" name="dob" value={Studentdata.dob} onChange={inputhandler} placeholder="Date of birth" required />
              </div>

              <div class="input_field"> <span><i aria-hidden="true" class="fa fa-book"></i></span>
                <input type="number" name="mm" value={Studentdata.mm} onChange={inputhandler} placeholder="Mathematics mark" required />
              </div>

              <div class="input_field"> <span><i aria-hidden="true" class="fa fa-bolt"></i></span>
                <input type="number" name="pm" value={Studentdata.pm} onChange={inputhandler} placeholder="Physics mark" required />
              </div>

              <div class="input_field"> <span><i aria-hidden="true" class="fa fa-flask"></i></span>
                <input type="number" name="cm" value={Studentdata.cm} onChange={inputhandler} placeholder="Chemistry mark" required />
              </div>

              <input class="button" type="submit" onClick={submitInput} value="submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
    <p class="credit">Developed by Hemnath</p>

    <Toaster position="top-center" reverseOrder={false} />

  </>);

}

export default Home;

