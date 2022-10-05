import React from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobile: '',
      }}
      validationSchema={RegisterSchema}
      onSubmit={values => Alert.alert(JSON.stringify(values))}>
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        isValid,
        handleSubmit,
      }) => (
        <View style={styles.wrapper}>
          <StatusBar barStyle="light-content" />
          <View style={styles.formContainer}>
            <Text style={styles.title}>Registrate</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Nombre"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={() => setFieldTouched('name')}
              />
              {errors.name && touched.name ? (
                <Text style={styles.errorTxt}>{errors.name}</Text>
              ) : null}
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Email"
                autoCapitalize={false}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
              />
              {errors.email && touched.email ? (
                <Text style={styles.errorTxt}>{errors.email}</Text>
              ) : null}
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Contraseña"
                autoCapitalize={false}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
              />
              {errors.password && touched.password ? (
                <Text style={styles.errorTxt}>{errors.password}</Text>
              ) : null}
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Contraseña confirma"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={() => setFieldTouched('confirmPassword')}
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <Text style={styles.errorTxt}>{errors.confirmPassword}</Text>
              ) : null}
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Celular"
                keyboardType="phone-pad"
                value={values.mobile}
                onChangeText={handleChange('mobile')}
                onBlur={() => setFieldTouched('mobile')}
              />
              {errors.mobile && touched.mobile ? (
                <Text style={styles.errorTxt}>{errors.mobile}</Text>
              ) : null}
            </View>
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!isValid}
              style={[
                styles.submitBtn,
                {backgroundColor: isValid ? '#395B64' : '#A5C9CA'},
              ]}>
              <Text style={styles.submitBtnText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C3333',
    paddingHorizontal: 15,
  },
  formContainer: {
    backgroundColor: '#F5EDDC',
    padding: 20,
    borderRadius: 20,
    width: '100%',
  },
  title: {
    color: '#16213E',
    fontSize: 26,
    fontWeight: '400',
    marginBottom: 15,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  inputStyle: {
    borderColor: '#16213E',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  errorTxt: {
    fontSize: 12,
    color: '#FF0D10',
  },
  submitBtn: {
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
  },
  submitBtnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default App;
