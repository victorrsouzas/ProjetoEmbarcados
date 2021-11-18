#include <SoftwareSerial.h>
#if defined(ESP32)
#include <WiFi.h>
#include <FirebaseESP32.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#include  <ArduinoJson.h>
#endif

#include <addons/RTDBHelper.h>

/* 1. Define the WiFi credentials */
#define WIFI_SSID "APT 901 -CLARO"
#define WIFI_PASSWORD "19530224"

/* 2. If work with RTDB, define the RTDB URL and database secret */
#define DATABASE_URL "portaria-remota-383bf-default-rtdb.firebaseio.com" //<databaseName>.firebaseio.com or <databaseName>.<region>.firebasedatabase.app
#define DATABASE_SECRET "IPrVerlpklVs1KFNiVAeiNhjXwnfhPDinzv9fBtK"

//Pinos de comunicacao serial com a ST Núcleo
#define Pin_ST_NUCLEO_RX    5  //Pino D1 da placa Node MCU
#define Pin_ST_NUCLEO_TX    4  //Pino D2 da placa Node MCU

/* 3. Define the Firebase Data object */
FirebaseData fbdo;

/* 4, Define the FirebaseAuth data for authentication data */
FirebaseAuth auth;

/* Define the FirebaseConfig data for config data */
FirebaseConfig config;
SoftwareSerial SSerial(Pin_ST_NUCLEO_RX, Pin_ST_NUCLEO_TX);

int ledAzul = D4;
int ledBranco = D3;
String ledStatus = "";
String passwordStatus = "";

void setup()
{
  // Open serial communications and wait for port to open:
  Serial.begin(115200);
  SSerial.begin(115200);

  Serial.println("Serial by hardware!");

  // set the data rate for the SoftwareSerial port
  SSerial.println("Serial by software!");

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  SSerial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    SSerial.print(".");
    delay(300);
  }
  Serial.println();
  SSerial.println();
  Serial.print("Connected with IP: ");
  SSerial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  SSerial.println(WiFi.localIP());
  Serial.println();
  SSerial.println();

  Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);
  SSerial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);

  /* Assign the certificate file (optional) */
  //config.cert.file = "/cert.cer";
  //config.cert.file_storage = StorageType::FLASH;

  /* Assign the database URL and database secret(required) */
  config.database_url = DATABASE_URL;
  config.signer.tokens.legacy_token = DATABASE_SECRET;

  Firebase.reconnectWiFi(true);

  /* Initialize the library with the Firebase authen and config */
  //Firebase.begin(&config, &auth);

  //Or use legacy authenticate method
  Firebase.begin(DATABASE_URL, DATABASE_SECRET);

  pinMode(ledAzul, OUTPUT);
  digitalWrite(ledAzul, LOW);
  pinMode(ledBranco, OUTPUT);
  digitalWrite(ledBranco, LOW);

}



void loop() // run over and over
{
  digitalWrite(ledBranco, HIGH);
  SSerial.print("Luz de entrada Ligada");
  SSerial.print("Acesso Liberado ");
  SSerial.println();  
  //  Firebase.getString(ledStatus, "Led");
  //  if (ledStatus == "ON") {
  //    Serial.println(ledStatus);
  //    digitalWrite(ledAzul, LOW);
  //    digitalWrite(ledVermvelho, LOW);
  //    digitalWrite(ledBranco, HIGH);
//      SSerial.print("Luz de entrada Ligada");
  //  }
  //  else {
  //    Serial.println(ledStatus);
  //    digitalWrite(ledBranco, LOW);
  //    digitalWrite(ledAzul, LOW);
  //    digitalWrite(ledVermvelho, LOW);
  //  }
  //  Firebase.getString(passwordStatus, "PASSWORD");
  //  if (passwordStatus == "TRUE") {
  //    Serial.println(ledStatus);
  //    digitalWrite(ledAzul, HIGH);
  //    digitalWrite(ledBranco, HIGH);
  //    digitalWrite(ledVermvelho, LOW);
//      SSerial.print("Entrada Liberada");
  //  }
  //  else {
  //    Serial.println(ledStatus);
  //    digitalWrite(ledBranco, HIGH);
  //    digitalWrite(ledVermvelho, HIGH);
  //    digitalWrite(ledAzul, LOW);
  //      SSerial.print("Entrada NEGADA");
  //  }
}
