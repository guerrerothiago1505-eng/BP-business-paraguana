import 'package:firebase_core/firebase_core.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

void main() => runApp(const BPApp());

class BPColors {
  static const Color red = Color(0xFFA11B20);
  static const Color gold = Color(0xFFC5A059);
  static const Color slate = Color(0xFF1A1A1A);
  static const Color beige = Color(0xFFF8F5F0);
  static const LinearGradient redGradient = LinearGradient(
    colors: [Color(0xFFC41E24), Color(0xFF7A0F12)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
}

class BPApp extends StatelessWidget {
  const BPApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(scaffoldBackgroundColor: BPColors.beige),
      home: const WelcomeScreen(),
    );
  }
}

// --- SERVICIO DE NOTIFICACIONES Y LOGS ---
class InternalSystem {
  static Future<void> saveLog(String action) async {
    final prefs = await SharedPreferences.getInstance();
    List<String> logs = prefs.getStringList('system_logs') ?? [];
    String timestamp = DateTime.now().toString().split('.')[0];
    logs.insert(0, "[$timestamp] $action");
    await prefs.setStringList('system_logs', logs);
  }

  static void showNotification(BuildContext context, String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message, style: GoogleFonts.montserrat(fontWeight: FontWeight.bold)),
        backgroundColor: BPColors.red,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
        margin: const EdgeInsets.all(20),
      ),
    );
  }
}

class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

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
                  const Icon(Icons.business_center, size: 100, color: BPColors.red), // Logo temporal
                  const SizedBox(height: 20),
                  Text('BUSINESS', style: GoogleFonts.montserrat(fontSize: 38, fontWeight: FontWeight.w900, color: BPColors.slate, letterSpacing: -2)),
                  Text('PARAGUANÁ', style: GoogleFonts.montserrat(fontSize: 38, fontWeight: FontWeight.w900, color: BPColors.red, letterSpacing: -2)),
                  Text('CONSULTORÍA & SERVICIOS', style: GoogleFonts.montserrat(fontSize: 10, fontWeight: FontWeight.w900, color: BPColors.gold, letterSpacing: 5)),
                ],
              ),
            ),
            Column(
              children: [
                _btn("CLIENTE PREMIUM", true, () => _showLogin(context)),
                const SizedBox(height: 15),
                _btn("SOLICITAR MEMBRESÍA", false, () => _showRegister(context)),
              ],
            )
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
        child: Text(txt, style: GoogleFonts.montserrat(color: isRed ? Colors.white : Colors.grey, fontWeight: FontWeight.w900, fontSize: 12)),
      ),
    );
  }

  void _showRegister(BuildContext context) {
    final nameCtrl = TextEditingController();
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(50))),
      builder: (context) => Padding(
        padding: EdgeInsets.only(bottom: MediaQuery.of(context).viewInsets.bottom, left: 30, right: 30, top: 40),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text("NUEVA SOLICITUD DE ALIANZA", style: GoogleFonts.montserrat(fontWeight: FontWeight.w900, color: BPColors.red)),
            TextField(controller: nameCtrl, decoration: const InputDecoration(labelText: "Nombre Completo")),
            const SizedBox(height: 20),
            _btn("ACEPTAR Y ENVIAR A BÓVEDA", true, () async {
              await InternalSystem.saveLog("Registro Iniciado: ${nameCtrl.text}");
              await InternalSystem.saveLog("Validación Biométrica: EXITOSA");
              await InternalSystem.saveLog("Datos enviados a Bóveda Central");
              if (context.mounted) {
                InternalSystem.showNotification(context, "🔔 Solicitud enviada a Bóveda");
                Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const DashboardPage()));
              }
            }),
            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }

  void _showLogin(BuildContext context) {
    InternalSystem.saveLog("Intento de acceso: Cliente Premium");
    Navigator.push(context, MaterialPageRoute(builder: (_) => const DashboardPage()));
  }
}

class DashboardPage extends StatelessWidget {
  const DashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(30),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 50),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text("HOLA, ALIADO", style: GoogleFonts.montserrat(fontSize: 24, fontWeight: FontWeight.w900)),
                    Text("VIP MASTER ACCESS", style: GoogleFonts.montserrat(fontSize: 10, fontWeight: FontWeight.w900, color: BPColors.red, letterSpacing: 2)),
                  ],
                ),
                GestureDetector(
                  onTap: () => _showSystemLogs(context),
                  child: const CircleAvatar(backgroundColor: Colors.white, radius: 28, child: Text("⚙️")),
                )
              ],
            ),
            const SizedBox(height: 30),
            // Mercado Virtual Card
            Container(
              height: 200,
              width: double.infinity,
              padding: const EdgeInsets.all(35),
              decoration: BoxDecoration(gradient: BPColors.redGradient, borderRadius: BorderRadius.circular(50)),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.end,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text("MERCADO VIRTUAL", style: GoogleFonts.montserrat(color: Colors.white, fontSize: 28, fontWeight: FontWeight.w900)),
                  Text("SISTEMA ACTIVO", style: GoogleFonts.montserrat(color: Colors.white70, fontSize: 10, fontWeight: FontWeight.w900)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showSystemLogs(BuildContext context) async {
    final prefs = await SharedPreferences.getInstance();
    List<String> logs = prefs.getStringList('system_logs') ?? ["No hay solicitudes recientes"];

    showModalBottomSheet(
      context: context,
      backgroundColor: BPColors.slate,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(30))),
      builder: (context) => Container(
        padding: const EdgeInsets.all(25),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("SOLICITUDES INTERNAS", style: GoogleFonts.montserrat(color: BPColors.gold, fontWeight: FontWeight.w900)),
            const Divider(color: Colors.white24),
            Expanded(
              child: ListView.builder(
                itemCount: logs.length,
                itemBuilder: (context, i) => Padding(
                  padding: const EdgeInsets.symmetric(vertical: 8),
                  child: Text(logs[i], style: const TextStyle(color: Colors.white70, fontSize: 12, fontFamily: 'monospace')),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
