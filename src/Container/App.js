import React, { Component } from 'react';
import { Layout } from '../Components';
import { Card, Image, Button, Icon, Segment, Input } from 'semantic-ui-react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import '../App.css';


const schema = Yup.object().shape({
  firstName: Yup.string()
  .min(5, 'name should have minimum 5 chracters ')
  .required('this field is required'),
  lastName: Yup.string()
  .min(5, 'name should have minimum 5 chracters ')
  .required('this field is required'),
  address: Yup.string()
  .min(5, 'name should have minimum 5 chracters ')
  .required('this field is required'),
  phone: Yup.number()
    .positive("The number can't be negative")
    .required()
})

class App extends Component {
  state = {
    pizzaOrder: {},
    total: 0,
  }

  handleClick = (pizza, type) => {
    let { pizzaOrder, total } = this.state; // now i can just use 'pizza' instead of 'this.state.pizza' everytime
    const { name, price } = pizza
    if(type === 'plus') {
      pizzaOrder[name] === undefined ? pizzaOrder[name] = 1 : pizzaOrder[name] = pizzaOrder[name] + 1
      total = total + price
    } else {
      pizzaOrder[name] === undefined ? pizzaOrder[name] = 1 : pizzaOrder[name] = pizzaOrder[name] - 1
      total = total - price
    }
    this.setState({pizza, total})
  }

  render() {
    console.log(this.state)
    const { pizzaOrder } = this.state;
    return (
      <div className="App">
        <Layout>
          <div style={{color: 'white'}}>
            <Card.Group>
              {
                pizzaData.map( pizza => {
                  return (
                      <Card key={pizza.name}>
                        <Image src={pizza.imageURL} />
                        <Card.Content>
                          <Card.Header>{pizza.name}</Card.Header>
                          <Card.Meta>Co-Worker</Card.Meta>
                          <Card.Description>
                            <Button.Group>
                              <Button color="orange" onClick={() => this.handleClick(pizza, 'plus')}><Icon name="add"/></Button>
                              <Button.Or text={this.state.pizzaOrder[pizza.name]} />
                              <Button disabled={pizzaOrder[pizza.name] === undefined || pizzaOrder[pizza.name] === 0} color="orange" onClick={() => this.handleClick(pizza, 'minus')}><Icon name="minus"/></Button>
                            </Button.Group>
                          </Card.Description>
                        </Card.Content>
                      </Card>
                  )
                })
              }
            </Card.Group>

            <Segment style={{ color: 'black' }}>
                <Formik
                  initialValues={{
                    firstName: this.props.name || '',
                    lastName: '',
                    address: '',
                    phone: '',
                  }}
                  onSubmit={values => {
                    // same shape as initial values
                    console.log(values);
                  }}
                  validationSchema={schema}
                >
                  <Form>
                    <Field name="firstName">
                      {({ field, form }) => (
                        <div className='form-input'>
                          <Input icon='sass' iconPosition='left' type="text" {...field} placeholder="First Name" />
                          {form.touched[field.name] &&
                            form.errors[field.name] && <div className="error">{form.errors[field.name]}</div>}
                        </div>
                      )}
                    </Field>
                    <Field name="lastName">
                      {({ field, form }) => (
                        <div className='form-input'>
                          <Input icon='user' iconPosition='left' type="text" {...field} placeholder="lastName" />
                          {form.touched[field.name] &&
                            form.errors[field.name] && <div className="error">{form.errors[field.name]}</div>}
                        </div>
                      )}
                    </Field>
                  <Field name="address">
                    {({ field, form }) => (
                      <div className='form-input'>
                        <Input icon='address card outline' iconPosition='left' type="text" {...field} placeholder="Full Address" />
                        {form.touched[field.name] &&
                          form.errors[field.name] && <div className="error">{form.errors[field.name]}</div>}
                      </div>
                    )}
                  </Field>
                  <Field name="phone">
                    {({ field, form }) => (
                      <div className='form-input'>
                        <Input icon='address card outline' iconPosition='left' type="number" {...field} placeholder="Phone Number" />
                        {form.touched[field.name] &&
                          form.errors[field.name] && <div className="error">{form.errors[field.name]}</div>}
                      </div>
                    )}
                  </Field>
                    <Button type="submit" content="Send" />
                  </Form>
                </Formik>
              </Segment>
          </div>
        </Layout>

      </div>
    );
  }
}

export default App;

const pizzaData = Array(4).fill(0).map((a, index) => ({
  name: `pizza${index}`,
  imageURL: 'http://storage.googleapis.com/bro-cdn1/zgrid/themes/10307/images/home/pizza.png',
  price: 10 + index,
}))
