import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';

//component
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import BackButton from '../../../components/back_button';
import Loading from '../../../components/loading';

//customs
import styles from './styles';

class ExtraInfo extends Component {

  state = {
    loading: true,
  }

  async componentDidMount() {
    this.setState({
      loading: false
    })
  }

  render() {

    const {
      loading,
    } = this.state

    const {
      params
    } = this.props.navigation.state

    return (
      <Container
        style={styles.container}
      >
        <CustomHeader
          center={
            <HeaderTitle
              text={params.title}
            />
          }
          left={
            <BackButton
              onPress={() => this.props.navigation.goBack()}
            />
          }
        />
        {
          loading ?
            <Loading />
            :
            <Content
              contentContainerStyle={styles.content}
            >
              {
                params.type == 0 ?
                  <Text
                    style={styles.paraf}
                  >
                    Términos y condiciones del uso de la aplicación.

  El presente documento establece los términos y condiciones mediante los cuales se regirá el uso de la aplicación de barbería a domicilio BRBR.
  Los siguientes Términos y condiciones crean un vínculo jurídico entre el usuario y el app BRBR, SAPI, razón por la cual toda vez que usted manifieste su consentimiento para el uso de dicha aplicación, el usuario se entiende sujeto a estos Términos y Condiciones. Si el usuario no acepta estos últimos no podrá hacer uso del servicio.
  La aplicación funcionará como un medio electrónico por medio del cual BRBR prestará servicios de barbería a domicilio.
  Servicios
  BRBR es un servicio de barbería a domicilio, que ofrecerá los siguientes servicios enunciados de manera no limitativa al usuario:
  Escoger de manera libre al barbero que ha de visitarle.BRBR se especializa en la selección de barberos de alta calidad, pero es responsabilidad del usuario la selección del mismo. BRBR no realizará reembolso alguno si se reporta mala calidad en los servicios de un babero menor a las tres estrellas. Si el barbero fuese de puntuación mayor, quedará a discreción de la empresa el reembolso.
  Agendar y crear citas en línea con el barbero
  Ser intermediario entre el barbero y el usuario.
  Brindar servicios de calidad y excelencia al usuario.
  Los pagos efectuados con tarjetas serán llevados a cabo a través de la plataforma Open Pay.
  Todos los servicios ofrecidos al usuario a través de la plataforma están sujetos a disponibilidad, ya sea territorial, ya sea horaria. Del mismo modo, las imágenes utilizadas en la app o en redes sociales son meramente ilustrativas y el servicio del barbero puede variar.

  Aceptación
  En el momento de instalar la app en sus dispositivos móviles, el usuario manifiesta, reconoce y acepta su completa conformidad en cuanto a las condiciones establecidas en el presente documento, por lo que estará permanentemente sujeto a los mismos. BRBR le invita a revisar con detenimiento los Términos y Condiciones antes de instalar o aceptar la descarga de la aplicación. Si usted no está de acuerdo con los mismos, BRBR no deberá instalar la misma, o en caso de que la descarga haya comenzado, usted tiene la obligación de suspender su uso. Además, al crear su cuenta, reconoce que es mayor de edad.

  Definiciones
  En adelante, se entenderá por:
  Usuario: Persona física o moral que descarga la aplicación, mayor de dieciocho años y en pleno uso de sus facultades mentales.
  BRBR: Persona moral que presta plataforma como intermediaria entre el usuario y el barbero.
  Barbero: Persona física que presta servicios de barbería a domicilio.



  Registro, contraseñas y factores de autenticación.
  Para poder hacer uso de los servicios arriba descritos, al descargar la aplicación en su dispositivo móvil, deberá crear una cuenta, que es imprescindible en la solicitud de los servicios, para agotar el proceso de creación, el usuario deberá ingresar en su totalidad la información requerida. El usuario está obligado a proporcionar información veraz y fidedigna; BRBR no se hará responsable de la veracidad de los datos proporcionados, dado que el usuario deberá hacerse cargo de la misma.
  BRBR recomienda guardar la información de inicio de sesión en un lugar privado al que sólo el usuario tenga acceso, ya que esta es necesaria para la solicitud de servicios.
  La cuenta es única e intransferible, y el usuario está obligado a hacerse responsable de todas las operaciones efectuadas en su cuenta, por lo tanto, está constreñido a hacer del conocimiento de BRBR cualquier uso no autorizado de la misma, sin que esto genere obligación alguna para la aplicación.
  BRBR se reserva en todo momento el derecho de negar, restringir, suspender, cancelar o condicionar el acceso total o parcial  a la utilización de la aplicación, a su discreción.
  BRBR deberá proporcionar y poner su disposición los factores de autenticación y políticas de seguridad competentes.


  Requisitos de uso
  El usuario deberá contar con dispositivos móviles o inteligentes con sistema operativo Android o IOS, con una fuente de internet confiable, estable y segura que facilite la descarga y óptimo uso del app.
  BRBR no se hará responsable por la seguridad de los equipos utilizados, de cargos adicionales que el proveedor de internet pueda llegar a realizar con motivo del uso del app, ni de la disponibilidad de los servicios en los dispositivos descargados.
  Así mismo BRBR no se hará responsable por daños o afectaciones que el dispositivo inteligente pueda sufrir a causa de virus informáticos malware mientras la aplicación esté en uso.

  De los derechos y obligaciones del usuario.
  El contenido y utilización de la aplicación es exclusivo del usuario, para obtener servicios, beneficios y funcionalidades ya mencionadas en los presentes Términos y Condiciones. De este modo, el usuario se obliga a no usar, comercializar, revelar, distribuir, o incluso regalar a terceros la información contenida en la aplicación con fines diferentes a los establecidos.
  Obligado está por o tanto el usuario a no disponer de la información contenida con fines distintos a su uso personal, de manera directa o indirecta.
  De la misma manera, el usuario está obligado a utilizar la plataforma de manera que no atente en contra de las normas de uso y convivencia de internet, las Leyes  vigentes  de los Estados Unidos Mexicanos, las buenas costumbres y derechos de terceros.

  De la reservación:
  El usuario deberá efectuar la reservación a través de la plataforma, y la misma quedará liquidada por medio de la plataforma Open Pay. La reserva puede ser cancelada en cualquier momento, sin embargo, si ella fuese cancelada dentro de las 24 horas siguientes se cobrará una penalización del 20%, si la cita es cancelada después de las primeras 24 horas se cobrará penalización del 50%
  El usuario está obligado a proporcionar un espacio con los mínimos requerimientos para el óptimo desarrollo de su cita, si no fuere así, no habrá reembolsos procedentes. Así mismo, si el barbero y el usuario fuesen desalojados del espacio en el que se lleve a cabo la cita no habrá reembolso alguno.

  De los reembolsos
  El usuario puede pedir reembolso por servicios que a sean, de calidad menor a la prometida, por citas canceladas de parte del barbero, o por inasistencia del mismo; sin embargo ellas deben ser debidamente reportadas en el área denominada reportar un problema dentro de la aplicación, sin que esto signifique que BRBR aceptará el reclamo.
  Los reembolsos se harán efectivos a través de la emisión de un código de promoción por el equivalente del cargo hecho. No habrá reembolsos en efectivo o por medio de transacciones en la plataforma Open Pay.

  De la comunicación.
  La comunicación entre los usuarios y el barbero deberá ser única y exclusivamente a través de la aplicación, si ella se diere fuera de la plataforma, BRBR no podrá hacerse responsable por cualquier abuso o falta de calidad en los servicios.
  la mencionada comunicación usuario. barbero debe ser constante, por lo que, si el barbero llega al destino indicado y el usuario no permite la entrada, responde mensajes, etc., el barbero esperará 15 minutos como máximo antes de retirarse. En este caso, no habrá posibilidad de reembolso.

  De los baberos.
  Los baberos son seleccionados por BRBR aplicando una serie de filtros de calidad extenuantes, sin embargo, si el barbero llegase a cometer algún hecho ilícito o que vaya en contra de la moral y buenas costumbres, BRBR se deslinda de cualquier responsabilidad.
  Es obligación del barbero contar con todos los elementos y materiales para realizar el servicio con excelencia. Al terminar la cita y antes de retirarse, éste deberá limpiar su lugar de trabajo.
  Si la cita es cancelada por el barbero se emitirá un código para que el usuario pueda canjearlo por una cita nueva.

  De las formas de pago
  Todas las transacciones serán efectuadas al momento de agendar la cita con tarjetas de débito o crédito seleccionadas, a través de la plataforma Open Pay.

  De la facturación
  En caso de que el usuario necesite emisión de facturas, las mismas deberán ser solicitadas al siguiente correo: hellobrbrapp@gmail.com, y el barbero de su selección emitirá la factura.

  Actualización de la aplicación
  El usuario está obligado a mantener la aplicación correctamente actualizada, reconociendo que BRBR puede solicitar en cualquier momento su actualización, con el fin de brindarle un óptimo servicio.

  Marcas
  Todas las marcas registradas utilizadas en la aplicación son propiedad de BRBR o bien, la empresa cuenta con los permisos necesarios para hacer uso de ellas, en virtud de la cual el usuario acepta que no tiene ni autoridad ni legitimación para utilizar y explotar marcas comerciales, logos, diseños y demás conceptos relacionados con BRBR, por lo que no podrá divulgar contenido de la aplicación, incluso sin fines de lucro.

  Propiedad Intelectual
  Los derechos de la propiedad intelectual con respecto al contenido, signos distintivos, logos, así como los derechos de uso y explotación de los mismos incluyendo su divulgación, publicación, reproducción y transformación son propiedad exclusiva de BRBR, por o que el usuario reconoce que no podrá divulgar este contenido.

  Aviso de privacidad

  BRBR, SAPI, con domicilio en Minería 96 int 304, colonia Escandón, Miguel Hidalgo, Ciudad de México, Cp. 11800 hace de su conocimiento que su información personal recabada a través de la aplicación para dispositivos inteligentes BRBR será utilizada para fines de identificación en cualquier tipo de vínculo jurídico realizado con BRBR, y ella es almacenada con los más altos estándares de seguridad cibernética.

  Modificaciones
  El usuario reconoce que BRBR puede, en cualquier momento, cambiar los Términos y condiciones establecidos en el presente documento, así como las características esenciales de la aplicación. En consecuencia, BRBR notificará al usuario de estos cambios cuando se efectuaren.

  Leyes Aplicables.
  Los presentes términos y condiciones estarán regido por las normas vigentes en la Ciudad de México, tales como el Código Civil y Mercantil, y cualquier controversia derivada del presente será sometida a interpretación de las autoridades jurisdiccionales competentes.

                </Text>
                  :
                  params.type == 1 ?
                    <Text
                      style={styles.paraf}
                    >
                      <Text>
                        Aviso de privacidad
                      BRBR, SAPI, con domicilio en Minería 96 int 304, colonia Escandón, Miguel Hidalgo, Ciudad de México, Cp. 11800 hace de su conocimiento que su información personal recabada a través de la aplicación para dispositivos inteligentes BRBR será utilizada para fines de identificación en cualquier tipo de vínculo jurídico realizado con BRBR, y ella es almacenada con los más altos estándares de seguridad cibernética.
  
                      </Text>
                      <Text>
                      Quejas y denuncias por tratamiento indebido de datos personales
                       Si el usuario considera que sus derechos de protección de datos personales han sido violentados en alguna manera imputable a BRBR, SAPI, con fundamento en la Ley Federal de Protección de Datos Personales  Posesión de los Particulares se podrá interponer una queja frente la autoridad jurisdiccional competente
  
                      </Text>
                      <Text>
                      Modificaciones
                      El usuario reconoce que BRBR puede, en cualquier momento, cambiar los Términos y condiciones establecidos en el presente documento, así como las características esenciales de la aplicación. En consecuencia, BRBR notificará al usuario de estos cambios cuando se efectuaren.
                   
                      </Text>
                      </Text>
                    :
                    <Text
                    style={styles.paraf}
                    >
                      Contacto: 5549023198
                      Dirección fiscal:
                      Minería 96,int 304, Escandón, Miguel Hidalgo, CDMX, cp 11800
                      Correo hellobrbrapp@gmail.com

                    </Text>
              }
            </Content>
        }
      </Container>
    );
  }
}

export default connect()(ExtraInfo);