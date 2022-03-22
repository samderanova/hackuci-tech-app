import { Form } from 'react-bootstrap';
import petr from './assets/petr.png';
import './App.css';

const TEST_ENDPOINT = 'https://hack-tech-app-endpoint.herokuapp.com/test';

function App() {
  async function submitForm(event) {
    event.preventDefault();
    const formElements = document.forms['hackuci-app'].elements;
    const name = formElements.f_name.value;
    const email = formElements.f_email.value;
    const funFact = formElements.f_funfact.value;
    
    const response = await fetch(`${TEST_ENDPOINT}?name=${name}&email=${email}&funfact=${funFact}`);
    if (response.status >= 200 && response.status < 400) {
      console.log(response);
      alert("Your form was successfully submitted. Thank you!");
    }
  }
  return (
    <div className="App">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <form id="hackuci-app" className="card p-5 m-auto" onSubmit={submitForm}>
              <h1 className="text-center">Hack UCI Application</h1>
              <Form.Group className="mb-3" controlId="f_name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" required></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="f_email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" required></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="f_funfact">
                <Form.Label>Fun Fact</Form.Label>
                <Form.Control as="textarea" placeholder="Fun Fact" rows="3" required></Form.Control>
              </Form.Group>
              <input type="submit" className="ms-auto mt-5 button-orange" value="Submit" />
            </form>
          </div>
          <div className="col-lg-6">
            <img src={petr} id="petr" alt="Petr the Anteatr" width="100px" className="d-block mx-auto my-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
