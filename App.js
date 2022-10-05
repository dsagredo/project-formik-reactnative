import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Input, Button, Dialog} from 'react-native-elements';
import {Formik} from 'formik';
import * as Yup from 'yup';

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

const App = () => {
  const [isAlert, setAlert] = useState('');
  const [visible, setVisible] = useState(false);

  const toggleDialog = values => {
    if (!visible) {
      setAlert(values);
    }
    setVisible(!visible);
  };

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          mobile: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values, {resetForm}) => {
          toggleDialog(values);
          resetForm({values: ''});
        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          setFieldTouched,
          isValid,
          handleSubmit,
        }) => (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
              backgroundColor: '#3e609d',
            }}>
            <View
              style={{
                padding: 20,
                width: '100%',
                backgroundColor: '#ffffff',
                borderRadius: 20,
              }}>
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: '500',
                  marginBottom: 15,
                  textAlign: 'center',
                }}>
                Registrate
              </Text>
              <View>
                <Input
                  placeholder="Nombre"
                  value={values.name}
                  inputStyle={{
                    fontSize: 17,
                  }}
                  errorStyle={{color: 'red'}}
                  errorMessage={
                    errors.name && touched.name ? (
                      <Text>{errors.name}</Text>
                    ) : null
                  }
                  onChangeText={handleChange('name')}
                  onBlur={() => setFieldTouched('name')}
                />
                <Input
                  placeholder="Email"
                  autoCapitalize={false}
                  value={values.email}
                  style={{
                    fontSize: 17,
                  }}
                  errorStyle={{color: 'red'}}
                  errorMessage={
                    errors.email && touched.email ? (
                      <Text>{errors.email}</Text>
                    ) : null
                  }
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                />
                <Input
                  placeholder="Contraseña"
                  secureTextEntry={true}
                  value={values.password}
                  style={{
                    fontSize: 17,
                  }}
                  errorStyle={{color: 'red'}}
                  errorMessage={
                    errors.password && touched.password ? (
                      <Text>{errors.password}</Text>
                    ) : null
                  }
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                />
                <Input
                  placeholder="Contraseña confirma"
                  secureTextEntry={true}
                  value={values.confirmPassword}
                  style={{
                    fontSize: 17,
                  }}
                  errorStyle={{color: 'red'}}
                  errorMessage={
                    errors.confirmPassword && touched.confirmPassword ? (
                      <Text>{errors.confirmPassword}</Text>
                    ) : null
                  }
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={() => setFieldTouched('confirmPassword')}
                />
                <Input
                  placeholder="Celular"
                  keyboardType="phone-pad"
                  value={values.mobile}
                  style={{
                    fontSize: 17,
                  }}
                  errorStyle={{color: 'red'}}
                  errorMessage={
                    errors.mobile && touched.mobile ? (
                      <Text>{errors.mobile}</Text>
                    ) : null
                  }
                  onChangeText={handleChange('mobile')}
                  onBlur={() => setFieldTouched('mobile')}
                />
              </View>
              <View style={{marginTop: 25}}>
                <Button
                  disabled={!isValid}
                  buttonType="outline"
                  onPress={handleSubmit}
                  title="Enviar"
                  buttonColor="#039BE5"
                />
              </View>
            </View>
          </View>
        )}
      </Formik>
      <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
        <Dialog.Title title="Información" />
        <Text>{JSON.stringify(isAlert)}</Text>
      </Dialog>
    </>
  );
};

export default App;
