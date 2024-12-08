import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, ScrollView, Platform, AppState } from 'react-native';
import Colours from '../../../assets/colours';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function SignUp() {
  const navigation = useNavigation();
  const [ongName, setOngName] = useState(null);
  const [ongCnpj, setOngCnpj] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [emailTester, setEmailTester] = useState(null);
  const [senha, setSenha] = useState(null);
  const [senhaTester, setSenhaTester] = useState(null);
  const [cep, setCep] = useState(null);
  const [logradouro, setLogradouro] = useState(null);
  const [numero, setNumero]  = useState (null);
  const [bairro, setBairro] = useState(null);
  const [cidade, setCidade] = useState(null);
  const [estado, setEstado] = useState(null);

  const fetchAddress = async () => {
    if (!cep || cep.length < 8) {
      Alert.alert("Erro", "Por favor, insira um CEP válido com 8 dígitos.");
      return;
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      console.log(response.data); // Debug: Verificar retorno da API
      if (response.data.erro) {
        Alert.alert("Erro", "CEP inválido ou não encontrado.");
      } else {
        setLogradouro(response.data.logradouro || "");
        setNumero(response.data.numero || "");
        setBairro(response.data.bairro || "");
        setCidade(response.data.localidade || "");
        setEstado(response.data.uf || "");
      }
    
      
    } catch (error) {
      Alert.alert("Erro", "Não foi possível buscar o endereço.");
    }
  };
  

  function validation() {
    
    if (ongName && phone && email && emailTester && senha && senhaTester && cep && logradouro && numero && bairro && cidade && estado) {
      if (email === emailTester) {
        if (senha === senhaTester) {
          if (senha.length > 7) {
            navigation.navigate('SignIn');
          } else {
            Alert.alert("A senha precisa ter no mínimo 8 caracteres");
          }
        } else {
          Alert.alert("Senhas não correspondem");
          setSenha('');
          setSenhaTester('');
        }
      } else {
        Alert.alert("Emails não correspondem");
        setEmail('');
        setEmailTester('');
      }
    } else {
      Alert.alert("Preencha os espaços em branco");
    }
  }
  

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Image
          source={require('../../../assets/images/logoHealth.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.formContainer}>
          <Text style={styles.text}>Dados Cadastrais ONG:</Text>
          <TextInput
            placeholder="Nome da ONG"
            onChangeText={setOngName}
            value={ongName}
            style={styles.input}
          />
          <TextInput
            placeholder="CNPJ da ONG, se possuir"
            onChangeText={setOngCnpj}
            value={ongCnpj}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Telefone"
            onChangeText={setPhone}
            value={phone}
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            style={styles.input}
            placeholder="Digite o CEP"
            placeholderTextColor="#808080"
            keyboardType="numeric"
            value={cep}
            onChangeText={setCep}
            onBlur={fetchAddress} // Busca ao sair do campo
          />

          <TextInput
            style={styles.input}
            placeholder="Logradouro"
            placeholderTextColor="#808080"
            value={logradouro}
            onChangeText={setLogradouro}
          />
          <TextInput
            style={styles.input}
            placeholder="Número do prédio"
            placeholderTextColor="#808080"
            value={numero}
            onChangeText={setNumero}
          />

          <TextInput
            style={styles.input}
            placeholder="Bairro"
            placeholderTextColor="#808080"
            value={bairro}
            onChangeText={setBairro}
          />

          <TextInput
            style={styles.input}
            placeholder="Cidade"
            placeholderTextColor="#808080"
            value={cidade}
            onChangeText={setCidade}
          />

          <TextInput
            style={styles.input}
            placeholder="Estado"
            placeholderTextColor="#808080"
            value={estado}
            onChangeText={setEstado}
          />


          <TextInput
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            style={styles.input}
          />
          <TextInput
            placeholder="Confirme o email"
            onChangeText={setEmailTester}
            value={emailTester}
            style={styles.input}
          />
          <TextInput
            placeholder="Senha"
            onChangeText={setSenha}
            value={senha}
            style={styles.input}
            secureTextEntry={true}
          />
          <TextInput
            placeholder="Confirme a senha"
            onChangeText={setSenhaTester}
            value={senhaTester}
            style={styles.input}
            secureTextEntry={true}
          />
          <Text style={styles.text}>
            Ao clicar em Cadastre-se, você concorda com nossos Termos, Política de Privacidade e Política de Cookies.
          </Text>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => validation()}
          >
            <Text style={styles.textButton}>Cadastrar</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.footer}>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.backgroundColour,
  },
  image: {
    width: '60%',
    alignSelf: 'center',
    marginTop: -400,
    paddingBottom: 0,
    
  },
  text: {
    color: Colours.lightgreen,
    fontWeight: 'bold',
    margin: 20,
    alignSelf: "center",
  },
  input: {
    backgroundColor: Colours.gray,
    margin: 10,
    padding: 5,
    borderRadius: 25,
    paddingLeft: 15,
  },
  formContainer: {
    paddingHorizontal: 40,
    marginTop: -450
  },
  signUpButton: {
    backgroundColor: Colours.lightgreen,
    alignItems: "center",
    paddingHorizontal: 80,
    borderRadius: 40,
    alignSelf: "center",
    paddingVertical: 10,
    marginVertical: 20,
  },
  textButton: {
    color: Colours.offWhite,
    fontWeight: 'bold',
  },
  footer:{
    height: 40
  }
});
