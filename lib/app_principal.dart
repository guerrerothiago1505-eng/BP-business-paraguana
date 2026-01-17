class BPLogo extends StatelessWidget {
  final double size;
  const BPLogo({super.key, this.size = 150});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: size,
      height: size,
      child: CustomPaint(
        painter: LogoPainter(),
      ),
    );
  }
}

// Esta clase dibuja exactamente el diseño Delta Diamond de la IA
class LogoPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final double w = size.width;
    final double h = size.height;
    final double scale = w / 500; // Basado en el viewBox 500x550

    // Gradiente Carmesí (Lado Izquierdo)
    final crimsonPaint = Paint()
      ..shader = const LinearGradient(
        colors: [Color(0xFFC41E24), Color(0xFF7A0F12)],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ).createShader(Rect.fromLTWH(0, 0, w, h));

    // Gradiente Dorado (Lado Derecho)
    final goldPaint = Paint()
      ..shader = const LinearGradient(
        colors: [Color(0xEAD2A0FF), Color(0xFFC5A059), Color(0xFF8F7135)],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ).createShader(Rect.fromLTWH(0, 0, w, h));

    // Dibujando el "Business Pillar" (Ala Izquierda)
    var pathLeft = Path();
    pathLeft.moveTo(250 * scale, 40 * scale);
    pathLeft.lineTo(80 * scale, 340 * scale);
    pathLeft.lineTo(160 * scale, 340 * scale);
    pathLeft.lineTo(250 * scale, 160 * scale);
    pathLeft.close();
    canvas.drawPath(pathLeft, crimsonPaint);

    // Dibujando el "Property Pillar" (Ala Derecha)
    var pathRight = Path();
    pathRight.moveTo(250 * scale, 40 * scale);
    pathRight.lineTo(420 * scale, 340 * scale);
    pathRight.lineTo(340 * scale, 340 * scale);
    pathRight.lineTo(250 * scale, 160 * scale);
    pathRight.close();
    canvas.drawPath(pathRight, goldPaint);

    // Centro (Diamante Blanco)
    final whitePaint = Paint()..color = Colors.white.withOpacity(0.9);
    var pathCore = Path();
    pathCore.moveTo(250 * scale, 160 * scale);
    pathCore.lineTo(320 * scale, 300 * scale);
    pathCore.lineTo(180 * scale, 300 * scale);
    pathCore.close();
    canvas.drawPath(pathCore, whitePaint);
    
    // Fundación Dorada (Barras inferiores)
    canvas.drawRRect(
      RRect.fromRectAndRadius(Rect.fromLTWH(140 * scale, 360 * scale, 220 * scale, 8 * scale), const Radius.circular(4)),
      goldPaint,
    );
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
}
