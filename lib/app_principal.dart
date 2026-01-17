import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() => runApp(const BPApp());

class BPColors {
  static const Color red = Color(0xFFA11B20);
  static const Color redDark = Color(0xFF7A0F12);
  static const Color gold = Color(0xFFC5A059);
  static const Color slate = Color(0xFF1A1A1A);
  static const Color beige = Color(0xFFF8F5F0);
}

class BPApp extends StatelessWidget {
  const BPApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(scaffoldBackgroundColor: BPColors.beige),
      home: const AuthWrapper(),
    );
  }
}

// --- LÓGICA DE PERSISTENCIA (INICIO AUTOMÁTICO) ---
class AuthWrapper extends StatefulWidget {
  const AuthWrapper({super.key});
  @override
  State<AuthWrapper> createState() => _AuthWrapperState();
}

class _AuthWrapperState extends State<AuthWrapper> {
  @override
  void initState() {
    super.initState();
    _checkLogin();
  }

  void _checkLogin() async {
    final prefs = await SharedPreferences.getInstance();
    if (prefs.getBool('isLoggedIn') ?? false) {
      if (mounted) Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const DashboardPage()));
    }
  }

  @override
  Widget build(BuildContext context) => const WelcomeScreen();
}

// --- PANTALLA DE BIENVENIDA (ESTILO REACT) ---
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
                  const BPLogo(size: 220),
                  const SizedBox(height: 20),
                  Text('BUSINESS', style: GoogleFonts.montserrat(fontSize: 38, fontWeight: FontWeight.w900, color: BPColors.slate, letterSpacing: -2)),
                  Text('PARAGUANÁ', style: GoogleFonts.montserrat(fontSize: 38, fontWeight: FontWeight.w900, color: BPColors.red, letterSpacing: -2)),
                  Container(height: 2, width: 40, color: BPColors.gold, margin: const EdgeInsets.symmetric(vertical: 15)),
                  Text('CONSULTORÍA & SERVICIOS', style: GoogleFonts.montserrat(fontSize: 10, fontWeight: FontWeight.w900, color: BPColors.gold, letterSpacing: 5)),
                ],
              ),
            ),
            Column(
              children: [
                _btn("ACCESO CLIENTE VIP", true, () => _showLogin(context)),
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
          elevation: isRed ? 10 : 0,
          side: isRed ? BorderSide.none : const BorderSide(color: Color(0xFFEEEEEE)),
        ),
        child: Text(txt, style: GoogleFonts.montserrat(color: isRed ? Colors.white : Colors.grey, fontWeight: FontWeight.w900, fontSize: 12, letterSpacing: 2)),
      ),
    );
  }

  // --- MODAL DE REGISTRO CON "BÓVEDA" ---
  void _showRegister(BuildContext context) {
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
            Text("SOLICITUD DE ALIANZA", style: GoogleFonts.montserrat(fontWeight: FontWeight.w900, color: BPColors.red)),
            const SizedBox(height: 20),
            TextField(controller: nameCtrl, decoration: const InputDecoration(labelText: "Nombre Completo")),
            TextField(controller: cedulaCtrl, decoration: const InputDecoration(labelText: "Cédula de Identidad")),
            TextField(controller: mailCtrl, decoration: const InputDecoration(labelText: "Correo Electrónico")),
            const SizedBox(height: 20),
            const Text("🔒 Verificación Biométrica Requerida", style: TextStyle(fontSize: 12, color: BPColors.gold)),
            const SizedBox(height: 30),
            _btn("ACEPTAR Y GUARDAR EN BÓVEDA", true, () async {
              final prefs = await SharedPreferences.getInstance();
              await prefs.setString('user_name', nameCtrl.text);
              await prefs.setString('user_mail', mailCtrl.text);
              await prefs.setBool('isLoggedIn', true);
              if (context.mounted) Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const DashboardPage()));
            }),
            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }

  void _showLogin(BuildContext context) {
    // Aquí implementas la validación contra la boveda (SharedPreferences)
    Navigator.push(context, MaterialPageRoute(builder: (_) => const DashboardPage()));
  }
}

// --- DASHBOARD (CLON EXACTO DE TU REACT) ---
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
                const CircleAvatar(backgroundColor: Colors.white, radius: 28, child: Text("🔔"))
              ],
            ),
            const SizedBox(height: 30),
            // Ticker de Monedas
            Container(
              padding: const EdgeInsets.all(25),
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(40), border: Border.all(color: Colors.white)),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  _coin("USD", "339.14"),
                  Container(width: 1, height: 30, color: Colors.grey[200]),
                  _coin("EUR", "395.26"),
                ],
              ),
            ),
            const SizedBox(height: 30),
            // Mercado Virtual Card
            Container(
              height: 220,
              width: double.infinity,
              padding: const EdgeInsets.all(35),
              decoration: BoxDecoration(gradient: BPColors.redGradient, borderRadius: BorderRadius.circular(50), boxShadow: [BoxShadow(color: BPColors.red.withOpacity(0.3), blurRadius: 20, offset: const Offset(0, 10))]),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.end,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text("MERCADO VIRTUAL", style: GoogleFonts.montserrat(color: Colors.white, fontSize: 28, fontWeight: FontWeight.w900)),
                  Text("ACTIVOS DE ALTO VALOR", style: GoogleFonts.montserrat(color: Colors.white70, fontSize: 10, fontWeight: FontWeight.w900, letterSpacing: 3)),
                ],
              ),
            ),
            const SizedBox(height: 30),
            // Grid de Opciones
            GridView.count(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisCount: 2,
              mainAxisSpacing: 20,
              crossAxisSpacing: 20,
              children: [
                _gridItem("💼", "NEGOCIOS"),
                _gridItem("⚖️", "LEGAL"),
                _gridItem("🏠", "INMUEBLES"),
                _gridItem("🚚", "LOGÍSTICA"),
              ],
            ),
            const SizedBox(height: 100),
          ],
        ),
      ),
      bottomNavigationBar: _navBar(),
    );
  }

  Widget _coin(String label, String value) {
    return Column(children: [
      Text(label, style: GoogleFonts.montserrat(fontSize: 8, fontWeight: FontWeight.w900, color: BPColors.gold)),
      Text(value, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
    ]);
  }

  Widget _gridItem(String emoji, String label) {
    return Container(
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(45), boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10)]),
      child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
        Text(emoji, style: const TextStyle(fontSize: 40)),
        const SizedBox(height: 10),
        Text(label, style: GoogleFonts.montserrat(fontSize: 10, fontWeight: FontWeight.w900, letterSpacing: 1)),
      ]),
    );
  }

  Widget _navBar() {
    return Container(
      height: 100,
      decoration: const BoxDecoration(color: Colors.white, borderRadius: BorderRadius.vertical(top: Radius.circular(50))),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _navIcon("🏠", "INICIO", true),
          _navIcon("💼", "MERCADO", false),
          _navIcon("💬", "ASESOR", false),
          _navIcon("👤", "PERFIL", false),
        ],
      ),
    );
  }

  Widget _navIcon(String icon, String label, bool active) {
    return Column(mainAxisAlignment: MainAxisAlignment.center, children: [
      Container(width: 50, height: 50, decoration: BoxDecoration(color: active ? BPColors.red : Colors.transparent, borderRadius: BorderRadius.circular(15)), child: Center(child: Text(icon, style: const TextStyle(fontSize: 20)))),
      Text(label, style: GoogleFonts.montserrat(fontSize: 8, fontWeight: FontWeight.w900, color: active ? BPColors.red : Colors.grey)),
    ]);
  }
}

// --- EL PAINTER DEL LOGO IA ---
class BPLogo extends StatelessWidget {
  final double size;
  const BPLogo({super.key, this.size = 150});
  @override
  Widget build(BuildContext context) => SizedBox(width: size, height: size, child: CustomPaint(painter: LogoPainter()));
}

class LogoPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final scale = size.width / 500;
    final crimson = Paint()..shader = const LinearGradient(colors: [Color(0xFFC41E24), Color(0xFF7A0F12)]).createShader(Rect.fromLTWH(0, 0, size.width, size.height));
    final gold = Paint()..shader = const LinearGradient(colors: [Color(0xFFEAD2A0), Color(0xFFC5A059)]).createShader(Rect.fromLTWH(0, 0, size.width, size.height));
    canvas.drawPath(Path()..moveTo(250*scale, 40*scale)..lineTo(80*scale, 340*scale)..lineTo(160*scale, 340*scale)..lineTo(250*scale, 160*scale)..close(), crimson);
    canvas.drawPath(Path()..moveTo(250*scale, 40*scale)..lineTo(420*scale, 340*scale)..lineTo(340*scale, 340*scale)..lineTo(250*scale, 160*scale)..close(), gold);
  }
  @override
  bool shouldRepaint(old) => false;
}
