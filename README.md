# React Native form validations with Formik and Yup
<br>
<div align="center">
  
![rnfy](https://user-images.githubusercontent.com/24228373/194176872-c727eed1-4248-485e-9321-f44aee6be7c6.png)

</div>

## Build-With:

- react-native-elements
- yup
- formik

## Features
using Formik for form creation, Yup for form validation, and React Native Elements for a visually appealing UI.

![19 01 14](https://user-images.githubusercontent.com/24228373/194177941-89151d0c-481f-4a2a-8559-93b19c62878b.png)

## Formik
Let’s start with all of our imports:
```sh
import { Formik } from "formik";
```
In our return statement, we’ll then use the <Formik> tag to render our form. Formik makes forms super easy to complete, because it has a lot of built in methods. We start by initiating empty values for the fields we want to complete with initialValues={}. We’ll then include validationSchema={RegisterSchema}. FormValidation is a function we’ll write in the next section.
The next method we need is onSubmit={(values, resetForm) => {}}. Values is the object that includes your initialValues. We can grab the specific value we’ll be changing and add it directly to the booksRef collection. The input “resetForm” will allow us to reset our form after it’s submitted. Our final Step is to pass in props and render the form using <TextInput>. At the end of the form, we will include a button, that will submit our form. Formik has another intrinsic property called handleSubmit, which takes care of this functionality for us without us having to define it. See the Formik code below:

## Yup Validation
```sh
import * as Yup from 'yup';
```
  
Let’s add a few touches to our form to make sure we don’t accidentally render a book with an empty title or forget to fill out a required field. Yup allows us to render helpful error messages in case something goes wrong. Above our App.js function, we’ll now write our RegisterSchema function that we pass into validationSchema:
```sh
const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Por favor ingresa tu nombre.'),
  email: Yup.string()
    .email('Email inválido')
    .required('Por favor ingrese su email.'),
  password: Yup.string()
    .min(8)
    .required('Por favor ingrese su contraseña')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Debe contener mínimo 8 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
    ),
  confirmPassword: Yup.string()
    .min(8, 'La contraseña de confirmación debe tener 8 caracteres.')
    .oneOf([Yup.ref('password')], 'Tus contraseñas no coinciden.')
    .required('Se requiere confirmar contraseña.'),
  mobile: Yup.string()
    .min(10, 'Debe tener exactamente 10 dígitos.')
    .max(10, 'Debe tener exactamente 10 dígitos.')
    .matches(/^[0-9]+$/, 'Deben ser solo dígitos.')
    .required('Por favor, introduzca su número de móvil.'),
});
```
![19 54 14](https://user-images.githubusercontent.com/24228373/194179418-eea28a12-394e-4090-ab01-b4a95f39730d.png)

To render these specific messages upon submission, we’ll need to pass in one more property into our BookForm function. Formik has two properties called “errors” and “touched” that allow for messages to be rendered upon typing invalid input into the form. After each <TextInput> that we want to validate, we will add the following:
```sh
  <Input
    placeholder="Nombre"
    value={values.name}
    inputStyle={{fontSize: 17}}
    errorStyle={{color: 'red'}}
    errorMessage={
    errors.name && touched.name ? (
      <Text>{errors.name}</Text>
      ) : null
    }
    onChangeText={handleChange('name')}
    onBlur={() => setFieldTouched('name')}
   />
```
## React Native Elements - Dialog
this formik we have another prop called on submit and for this on submit we will get the values which we can display in an dialog which we need to import form react-native-elements.  

 
```sh
onSubmit={(values, {resetForm}) => {
  toggleDialog(values);
  resetForm({values: ''});
}}  
``` 
i can Json.stringify those values andwe can see the values.  
```sh
<Dialog isVisible={visible} onBackdropPress={toggleDialog}>
  <Dialog.Title title="Información" />
  <Text>{JSON.stringify(isAlert)}</Text>
</Dialog>  
``` 
![19 54 49](https://user-images.githubusercontent.com/24228373/194179417-95c23828-2d30-4442-898e-f8240502da92.png)

## Installation
```sh
$ git clone https://github.com/dsagredo/project-react-native-formik.git
$ cd projectreactnativeformik/
$ npm install
$ npm run ios
```

