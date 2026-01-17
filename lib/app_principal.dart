import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:animations/animations.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
    statusBarColor: Colors.transparent,
    statusBarIconBrightness: Brightness.dark,
  ));
  runApp(const BusinessParaguanaApp());
}

// --- IDENTIDAD VISUAL ---
class BPColors {
  static const Color red = Color(0xFFA11B20);
  static const Color redDark = Color(0xFF7A0F12);
  static const Color gold = Color(0xFFC5A059);
  static const Color slate = Color(0xFF121212);
  static const Color beige = Color(0xFFE8E2D9);
  
  static const LinearGradient redGradient = LinearGradient(
    colors: [red, redDark],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
}

class BusinessParaguanaApp extends StatelessWidget {
  const BusinessParaguanaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Business Paraguaná',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        scaffoldBackgroundColor: BPColors.beige,
        textTheme: GoogleFonts.interTextTheme(),
      ),
      // Inicia en la Portada de Bienvenida
      home: const WelcomeScreen(),
    );
  }
}

// --- PANTALLA DE PORTADA (LOGO Y ACCESO) ---
class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(horizontal: 30),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const BPLogo(size: 180),
            const SizedBox(height: 40),
            Text('BIENVENIDO A', 
              style: GoogleFonts.montserrat(letterSpacing: 4, fontSize: 10, fontWeight: FontWeight.w900, color: Colors.grey[500])),
            Text('BUSINESS', style: GoogleFonts.playfairDisplay(fontSize: 42, fontWeight: FontWeight.w900, letterSpacing: 2)),
            Text('PARAGUANÁ', style: GoogleFonts.playfairDisplay(fontSize: 42, fontWeight: FontWeight.w900, color: BPColors.red, letterSpacing: 2)),
            const SizedBox(height: 60),
            
            // Botón Ingreso Directo
            _authButton(context, "YA SOY USUARIO", Colors.white, BPColors.slate, () {
              Navigator.push(context, MaterialPageRoute(builder: (_) => const MainNavigation()));
            }),
            
            const SizedBox(height: 20),
            
            // Botón Registro (Activa Contrato)
            _authButton(context, "REGISTRARME", BPColors.red, Colors.white, () {
              mostrarContratoLegal(context);
            }),
          ],
        ),
      ),
    );
  }

  Widget _authButton(BuildContext context, String text, Color bg, Color textCol, VoidCallback action) {
    return SizedBox(
      width: double.infinity,
      height: 65,
      child: ElevatedButton(
        onPressed: action,
        style: ElevatedButton.styleFrom(
          backgroundColor: bg,
          foregroundColor: textCol,
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20),
            side: BorderSide(color: BPColors.red.withOpacity(0.1)),
          ),
        ),
        child: Text(text, style: const TextStyle(fontWeight: FontWeight.w900, letterSpacing: 2, fontSize: 12)),
      ),
    );
  }
}

// --- SISTEMA DE NAVEGACIÓN ---
class MainNavigation extends StatefulWidget {
  const MainNavigation({super.key});
  @override
  State<MainNavigation> createState() => _MainNavigationState();
}

class _MainNavigationState extends State<MainNavigation> {
  int _currentIndex = 0;
  final List<Widget> _pages = [
    const FlutterHomeScreen(),
    const Center(child: Text('Mercado de Activos')),
    const Center(child: Text('Chat con Asesor')),
    const Center(child: Text('Perfil de Aliado')),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: PageTransitionSwitcher(
        transitionBuilder: (child, animation, secondaryAnimation) => SharedAxisTransition(
          animation: animation,
          secondaryAnimation: secondaryAnimation,
          transitionType: SharedAxisTransitionType.horizontal,
          child: child,
        ),
        child: _pages[_currentIndex],
      ),
      bottomNavigationBar: Container(
        height: 100,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: const BorderRadius.vertical(top: Radius.circular(40)),
          boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 30)],
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            _navItem(0, Icons.home_filled, 'INICIO'),
            _navItem(1, Icons.business_center, 'NEGOCIOS'),
            _navItem(2, Icons.chat_bubble, 'ASESOR'),
            _navItem(3, Icons.person, 'PERFIL'),
          ],
        ),
      ),
    );
  }

  Widget _navItem(int index, IconData icon, String label) {
    bool active = _currentIndex == index;
    return GestureDetector(
      onTap: () => setState(() => _currentIndex = index),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, color: active ? BPColors.red : Colors.grey[400]),
          Text(label, style: TextStyle(fontSize: 8, fontWeight: FontWeight.bold, color: active ? BPColors.red : Colors.grey[400])),
        ],
      ),
    );
  }
}

// --- PANTALLA PRINCIPAL (DASHBOARD) ---
class FlutterHomeScreen extends StatelessWidget {
  const FlutterHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.fromLTRB(24, 60, 24, 100),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('BUSINESS', 
                    style: GoogleFonts.playfairDisplay(fontSize: 22, fontWeight: FontWeight.w900, letterSpacing: 2)),
                  const Text('PARAGUANÁ', 
                    style: TextStyle(color: BPColors.red, fontSize: 22, fontWeight: FontWeight.w900, letterSpacing: 2)),
                ],
              ),
              const Icon(Icons.notifications_none, size: 30),
            ],
          ),
          const SizedBox(height: 20),
          const Text('MEMBRESÍA VIP ACTIVA', 
            style: TextStyle(color: BPColors.red, fontSize: 10, fontWeight: FontWeight.w900, letterSpacing: 2)),
          const SizedBox(height: 30),
          _buildHeroCard(),
          const SizedBox(height: 30),
          const Text('SERVICIOS EJECUTIVOS', 
            style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.grey, letterSpacing: 2)),
          const SizedBox(height: 15),
          GridView.count(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisCount: 2,
            mainAxisSpacing: 20,
            crossAxisSpacing: 20,
            children: [
              _buildServiceCard('INMUEBLES', Icons.home_work, "BIENES RAÍCES"),
              _buildServiceCard('VEHÍCULOS', Icons.directions_car, "AUTOMOTRIZ"),
              _buildServiceCard('LEGAL', Icons.gavel, "CONSULTORÍA"),
              _buildServiceCard('PAGOS', Icons.payments, "FINANZAS"),
            ],
          )
        ],
      ),
    );
  }

  Widget _buildHeroCard() {
    return Container(
      height: 220,
      width: double.infinity,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(30),
        gradient: BPColors.redGradient,
        boxShadow: [
          BoxShadow(color: BPColors.red.withOpacity(0.3), blurRadius: 20, offset: const Offset(0, 10))
        ],
      ),
      child: Stack(
        children: [
          Positioned(
            right: -20,
            bottom: -20,
            child: Icon(Icons.business_center, size: 200, color: Colors.white.withOpacity(0.05)),
          ),
          Padding(
            padding: const EdgeInsets.all(30),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Text('MERCADO VIRTUAL', 
                  style: GoogleFonts.playfairDisplay(color: Colors.white, fontSize: 26, fontWeight: FontWeight.bold)),
                Text('ACTIVOS DE ALTO VALOR', 
                  style: TextStyle(color: Colors.white.withOpacity(0.7), fontSize: 10, letterSpacing: 4)),
                const SizedBox(height: 15),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 8),
                  decoration: BoxDecoration(color: BPColors.gold, borderRadius: BorderRadius.circular(10)),
                  child: const Text('EXPLORAR', 
                    style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),
                )
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildServiceCard(String title, IconData icon, String subtitle) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white, 
        borderRadius: BorderRadius.circular(25),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.03), blurRadius: 10)]
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, color: BPColors.red, size: 35),
          const SizedBox(height: 12),
          Text(title, style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 14)),
          Text(subtitle, 
            style: const TextStyle(color: BPColors.gold, fontSize: 8, fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }
}

// --- COMPONENTE LOGO ---
class BPLogo extends StatelessWidget {
  final double size;
  const BPLogo({super.key, this.size = 150});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: size,
      height: size,
      child: Stack(
        alignment: Alignment.center,
        children: [
          Container(
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(color: BPColors.gold.withOpacity(0.3), width: 1),
            ),
          ),
          Image.asset(
            'assets/logo.png', 
            fit: BoxFit.contain,
            errorBuilder: (c, e, s) => const Icon(Icons.business_center, color: BPColors.red, size: 80),
          ),
        ],
      ),
    );
  }
}

// --- MODAL DE CONTRATO (VALIDEZ JURÍDICA) ---
void mostrarContratoLegal(BuildContext context) {
  showDialog(
    context: context,
    barrierDismissible: false,
    barrierColor: const Color(0xFF0F172A).withOpacity(0.9),
    builder: (BuildContext context) {
      return Dialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(40)),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(40),
          child: Container(
            color: Colors.white,
            width: double.infinity,
            height: MediaQuery.of(context).size.height * 0.85,
            child: Column(
              children: [
                Container(
                  padding: const EdgeInsets.all(35),
                  decoration: const BoxDecoration(gradient: BPColors.redGradient),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text("⚖️", style: TextStyle(fontSize: 30)),
                      const SizedBox(height: 15),
                      Text("CONTRATO DE RESGUARDO", 
                        style: GoogleFonts.montserrat(color: Colors.white, fontSize: 22, fontWeight: FontWeight.w900, letterSpacing: -0.5)),
                      Text("BUSINESS PARAGUANÁ", 
                        style: GoogleFonts.montserrat(color: BPColors.gold, fontSize: 9, fontWeight: FontWeight.w900, letterSpacing: 2)),
                    ],
                  ),
                ),
                Expanded(
                  child: ListView(
                    padding: const EdgeInsets.all(35),
                    children: [
                      _legalItem("1. OBJETO DEL MANDATO", "Autorización expresa para la gestión, publicación y promoción del activo en la plataforma BP."),
                      _legalItem("2. COMISIÓN DE VENTA", "Inmuebles: 5%. Vehículos/Maquinaria: 3% a 5%. Arrendamientos: 1 mes."),
                      _legalItem("3. RESPONSABILIDAD", "El Aliado garantiza la legitimidad del activo. BP se reserva el derecho de retiro por faltas éticas."),
                      _legalItem("4. JURISDICCIÓN", "Domicilio especial en Punto Fijo, Estado Falcón, Venezuela."),
                    ],
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(35),
                  child: Column(
                    children: [
                      Text("Usted está aceptando un documento con validez jurídica digital.", 
                        style: TextStyle(fontSize: 8, color: Colors.grey[400], fontWeight: FontWeight.bold, letterSpacing: 1)),
                      const SizedBox(height: 15),
                      SizedBox(
                        width: double.infinity,
                        height: 65,
                        child: ElevatedButton(
                          onPressed: () {
                            Navigator.pop(context);
                            Navigator.push(context, MaterialPageRoute(builder: (_) => const MainNavigation()));
                          },
                          style: ElevatedButton.styleFrom(backgroundColor: BPColors.red, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20))),
                          child: const Text("ACEPTO Y CONTINUAR", style: TextStyle(color: Colors.white, fontWeight: FontWeight.w900, letterSpacing: 2)),
                        ),
                      ),
                    ],
                  ),
                )
              ],
            ),
          ),
        ),
      );
    },
  );
}

Widget _legalItem(String title, String content) {
  return Padding(
    padding: const EdgeInsets.only(bottom: 25),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 11, color: BPColors.slate, letterSpacing: 1)),
        const SizedBox(height: 8),
        Text(content, textAlign: TextAlign.justify, style: TextStyle(fontSize: 12, color: Colors.grey[600], height: 1.5)),
      ],
    ),
  );
}
