import 'package:flutter/material.dart';

void main() {
  runApp(const BusinessParaguanaApp());
}

class BusinessParaguanaApp extends StatelessWidget {
  const BusinessParaguanaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Business Paraguaná',
      theme: ThemeData(
        scaffoldBackgroundColor: const Color(0xFFF5F5DC), // brand-beige
        primaryColor: const Color(0xFFBE1E2D),           // brand-red
        fontFamily: 'sans-serif',
      ),
      home: const WelcomeScreen(),
    );
  }
}

// --- PANTALLA DE BIENVENIDA ---
class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        padding: const EdgeInsets.symmetric(horizontal: 30),
        width: double.infinity,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Logo (Placeholder)
            const Icon(Icons.business_center, size: 100, color: Color(0xFF1E293B)),
            const SizedBox(height: 20),
            const Text(
              'BUSINESS PARAGUANÁ',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 26,
                fontWeight: FontWeight.bold,
                color: Color(0xFF1E293B), // brand-slate
                letterSpacing: 2,
              ),
            ),
            const SizedBox(height: 40),
            // Botón Registrarse
            SizedBox(
              width: double.infinity,
              height: 55,
              child: ElevatedButton(
                onPressed: () { /* Aquí iría la navegación a registro */ },
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFBE1E2D),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: const Text('REGISTRARSE', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
              ),
            ),
            const SizedBox(height: 15),
            // Botón Iniciar Sesión
            SizedBox(
              width: double.infinity,
              height: 55,
              child: OutlinedButton(
                onPressed: () {
                  Navigator.push(context, MaterialPageRoute(builder: (context) => const LoginScreen()));
                },
                style: OutlinedButton.styleFrom(
                  side: const BorderSide(color: Color(0xFFBE1E2D)),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: const Text('INICIAR SESIÓN', style: TextStyle(color: Color(0xFFBE1E2D), fontWeight: FontWeight.bold)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// --- PANTALLA DE LOGIN ---
class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isVerifying = false;

  void _handleLogin() async {
    setState(() => _isVerifying = true);

    // Simulamos la carga que tenías en React (2 segundos)
    await Future.delayed(const Duration(seconds: 2));

    String email = _emailController.text.trim().toLowerCase();
    String password = _passwordController.text;

    if (email == 'business.paraguana2024@gmail.com' && password != '026825185250Hola#') {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Contraseña maestra incorrecta')),
        );
      }
    } else {
      // Login exitoso (Simulado)
      if (mounted) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const Scaffold(body: Center(child: Text("¡BIENVENIDO A HOME!")))),
        );
      }
    }
    setState(() => _isVerifying = false);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(backgroundColor: Colors.transparent, elevation: 0, iconTheme: const IconThemeData(color: Colors.black)),
      body: _isVerifying 
        ? const Center(child: CircularProgressIndicator(color: Color(0xFFBE1E2D)))
        : Padding(
            padding: const EdgeInsets.all(30.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('INICIAR SESIÓN', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
                const SizedBox(height: 30),
                TextField(
                  controller: _emailController,
                  decoration: const InputDecoration(labelText: 'CORREO ELECTRÓNICO', border: OutlineInputBorder()),
                ),
                const SizedBox(height: 20),
                TextField(
                  controller: _passwordController,
                  obscureText: true,
                  decoration: const InputDecoration(labelText: 'CONTRASEÑA', border: OutlineInputBorder()),
                ),
                const SizedBox(height: 30),
                SizedBox(
                  width: double.infinity,
                  height: 55,
                  child: ElevatedButton(
                    onPressed: _handleLogin,
                    style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFFBE1E2D)),
                    child: const Text('ENTRAR', style: TextStyle(color: Colors.white)),
                  ),
                ),
              ],
            ),
          ),
    );
  }
}
