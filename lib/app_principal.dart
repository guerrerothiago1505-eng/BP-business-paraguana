import 'package:firebase_core/firebase_core.dart';

import 'package:cloud_firestore/cloud_firestore.dart';

import 'package:firebase_messaging/firebase_messaging.dart';

import 'package:flutter/material.dart';

import 'package:google_fonts/google_fonts.dart';



void main() async {

  WidgetsFlutterBinding.ensureInitialized();

  // Esta línea activará la conexión real gracias al automatizador de GitHub

  await Firebase.initializeApp();

  

  // Configuramos notificaciones en segundo plano

  FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);

  

  runApp(const BusinessParaguanaApp());

}



// Manejador de notificaciones cuando la app está cerrada

Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {

  await Firebase.initializeApp();

}



class BPColors {

  static const Color red = Color(0xFFA11B20);

  static const Color gold = Color(0xFFC5A059);

  static const Color slate = Color(0xFF1A1A1A);

  static const Color beige = Color(0xFFF8F5F0);

}



class BusinessParaguanaApp extends StatelessWidget {

  const BusinessParaguanaApp({super.key});

  @override

  Widget build(BuildContext context) {

    return MaterialApp(

      debugShowCheckedModeBanner: false,

      theme: ThemeData(scaffoldBackgroundColor: BPColors.beige),

      home: const WelcomeScreen(),

    );

  }

}



class WelcomeScreen extends StatefulWidget {

  const WelcomeScreen({super.key});



  @override

  State<WelcomeScreen> createState() => _WelcomeScreenState();

}



class _WelcomeScreenState extends State<WelcomeScreen> {

  

  @override

  void initState() {

    super.initState();

    _setupNotifications();

  }



  // Lógica para que el usuario reciba notificaciones REALES

  void _setupNotifications() async {

    FirebaseMessaging messaging = FirebaseMessaging.instance;

    await messaging.requestPermission();

    

    // Escuchar mensajes cuando la app está abierta

    FirebaseMessaging.onMessage.listen((RemoteMessage message) {

      if (mounted) {

        _mostrarAlertaPremium(message.notification?.title ?? "Aviso", message.notification?.body ?? "");

      }

    });

  }



  void _mostrarAlertaPremium(String title, String body) {

    showDialog(

      context: context,

      builder: (context) => AlertDialog(

        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),

        title: Text(title, style: const TextStyle(color: BPColors.red, fontWeight: FontWeight.bold)),

        content: Text(body),

        actions: [TextButton(onPressed: () => Navigator.pop(context), child: const Text("ENTENDIDO"))],

      ),

    );

  }



  @override

  Widget build(BuildContext context) {

    return Scaffold(

      body: Padding(

        padding: const EdgeInsets.all(40.0),

        child: Column(

          children: [

            Expanded(

              child: Column(

                mainAxisAlignment: MainAxisAlignment.center,

                children: [

                  const Icon(Icons.business_center, size: 100, color: BPColors.red),

                  const SizedBox(height: 20),

                  Text('BUSINESS', style: GoogleFonts.montserrat(fontSize: 38, fontWeight: FontWeight.w900, color: BPColors.slate)),

                  Text('PARAGUANÁ', style: GoogleFonts.montserrat(fontSize: 38, fontWeight: FontWeight.w900, color: BPColors.red)),

                  Text('CLIENTE PREMIUM', style: GoogleFonts.montserrat(fontSize: 10, fontWeight: FontWeight.w900, color: BPColors.gold, letterSpacing: 5)),

                ],

              ),

            ),

            _btn("ACCESO CLIENTE PREMIUM", true, () => _loginReal(context)),

            const SizedBox(height: 15),

            _btn("SOLICITAR MEMBRESÍA", false, () => _registroReal(context)),

          ],

        ),

      ),

    );

  }



  Widget _btn(String txt, bool isRed, VoidCallback ontap) {

    return SizedBox(

      width: double.infinity,

      height: 70,

      child: ElevatedButton(

        onPressed: ontap,

        style: ElevatedButton.styleFrom(

          backgroundColor: isRed ? BPColors.red : Colors.white,

          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),

        ),

        child: Text(txt, style: GoogleFonts.montserrat(color: isRed ? Colors.white : Colors.grey, fontWeight: FontWeight.w900)),

      ),

    );

  }



  void _registroReal(BuildContext context) {

    final nameCtrl = TextEditingController();

    final cedulaCtrl = TextEditingController();

    final mailCtrl = TextEditingController();



    showModalBottomSheet(

      context: context,

      isScrollControlled: true,

      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(50))),

      builder: (context) => Padding(

        padding: EdgeInsets.only(bottom: MediaQuery.of(context).viewInsets.bottom, left: 30, right: 30, top: 40),

        child: Column(

          mainAxisSize: MainAxisSize.min,

          children: [

            Text("SOLICITUD DE MEMBRESÍA REAL", style: GoogleFonts.montserrat(fontWeight: FontWeight.w900, color: BPColors.red)),

            TextField(controller: nameCtrl, decoration: const InputDecoration(labelText: "Nombre")),

            TextField(controller: cedulaCtrl, decoration: const InputDecoration(labelText: "Cédula")),

            TextField(controller: mailCtrl, decoration: const InputDecoration(labelText: "Correo")),

            const SizedBox(height: 20),

            ElevatedButton(

              onPressed: () async {

                // GUARDAR EN BÓVEDA REAL (Firestore)

                await FirebaseFirestore.instance.collection('solicitudes').add({

                  'nombre': nameCtrl.text,

                  'cedula': cedulaCtrl.text,

                  'correo': mailCtrl.text,

                  'status': 'pendiente',

                  'fecha': FieldValue.serverTimestamp(),

                });

                if (context.mounted) Navigator.pop(context);

                ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text("✅ Enviado a Bóveda. El ADM revisará tu solicitud.")));

              },

              child: const Text("ENVIAR A REVISIÓN"),

            ),

            const SizedBox(height: 40),

          ],

        ),

      ),

    );

  }



  void _loginReal(BuildContext context) {

    Navigator.push(context, MaterialPageRoute(builder: (_) => const DashboardPage()));

  }

}



class DashboardPage extends StatelessWidget {

  const DashboardPage({super.key});

  @override

  Widget build(BuildContext context) {

    return Scaffold(

      appBar: AppBar(title: const Text("Panel Aliado VIP"), backgroundColor: BPColors.red),

      body: const Center(child: Text("Bienvenido al Mercado Virtual Real")),

    );

  }

}
