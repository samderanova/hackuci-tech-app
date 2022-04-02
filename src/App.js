import { Form } from 'react-bootstrap';
import petr from './assets/petr.png';
import './App.css';
import { useEffect } from 'react';

const TEST_ENDPOINT = 'https://hack-tech-app-endpoint.herokuapp.com/test';

function App() {
  async function submitForm(event) {
    // Prevent default method of form submission
    event.preventDefault();

    const formElements = document.forms['hackuci-app'].elements;
    
    const name = formElements.f_name;
    const email = formElements.f_email;
    const funFact = formElements.f_funfact;

    const inputFields = [name, email, funFact];

    // Send user data to the appropriate API. Since this is a GET request, 
    // there is no need to specify any additional parameters. Instead, the values
    // can be appended to the end of the URL.
    const response = await fetch(`${TEST_ENDPOINT}?name=${name.value}&email=${email.value}&funfact=${funFact.value}`);

    // If the response is 200, then the data was successfully submitted. Log the response in the console, display
    // an alert message, clear all styles for invalid inputs, and clear all input text.
    if (response.status === 200) {
      console.log(response);

      alert("Your form was successfully submitted. Thank you!");

      inputFields.forEach(element => {
        element.classList.remove('is-invalid');
        element.value = '';
      });
    }
    // Since each field is marked as required, there are no parameters missing. If a 400 is returned, that means 
    // the email provided is invalid. Add the is-invalid class so the feedback message notifies the user that the
    // email provided is invalid.
    else {
      email.classList.add('is-invalid');
      email.focus();
    }
  }
  
  useEffect(() => {
    const formElements = document.forms['hackuci-app'].elements;

    const name = formElements.f_name;
    const email = formElements.f_email;
    const funFact = formElements.f_funfact;

    // Use Bootstrap error messages and styling instead of the
    // default HTML5 tooltips.
    [name, email, funFact].forEach(element => {

      element.addEventListener('input', event => {
        event.preventDefault();
        if (element.validity.valid) {
          element.classList.remove('is-invalid');
        }
      });

      element.addEventListener('invalid', event => {
        event.preventDefault();
        element.classList.add('is-invalid');
        document.querySelector('.is-invalid').focus();
      });

    });    

  }, []);
  
  return (
    <div className="App">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 py-5">
            <form id="hackuci-app" className="card p-5 m-auto" onSubmit={submitForm}>
              <h1 className="text-center">Hack UCI Application</h1>
              <Form.Group className="mb-3" controlId="f_name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" required></Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid name!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="f_email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" required></Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="f_funfact">
                <Form.Label>Fun Fact</Form.Label>
                <Form.Control as="textarea" placeholder="Fun Fact" rows="3" required></Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid fun fact!
                </Form.Control.Feedback>
              </Form.Group>
              <input type="submit" className="ms-auto mt-5 button-orange" value="Submit" />
            </form>
          </div>
          <div className="col-lg-6">
            <img src={petr} id="petr" alt="Petr the Anteatr" width="150px" className="d-block mx-auto my-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
