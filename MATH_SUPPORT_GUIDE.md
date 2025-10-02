# 📐 Math Support in CKEditor - Complete Guide

## ✅ **IMPLEMENTED MATH SUPPORT**

Math equations are now fully supported in your lesson creation system using MathJax integration.

---

## 🎯 **How to Use Math in Lessons**

### **Inline Math (within text)**
Use single dollar signs: `$x^2 + y^2 = z^2$`
- **Example**: The equation $E = mc^2$ shows the relationship between energy and mass.

### **Display Math (centered, larger)**
Use double dollar signs: `$$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$`
- **Example**: 
  $$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$

### **Alternative Syntax**
- **Inline**: `\(x^2 + y^2 = z^2\)`
- **Display**: `\[E = mc^2\]`

---

## 📝 **Common Math Examples**

### **Basic Operations**
```
$x + y = z$
$x^2 + 2xy + y^2 = (x + y)^2$
$\sqrt{x^2 + y^2}$
$\frac{a}{b}$
```

### **Advanced Math**
```
$$\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$$
$$\lim_{x \to \infty} \frac{1}{x} = 0$$
$$\int_{0}^{1} x^2 dx = \frac{1}{3}$$
```

### **Greek Letters**
```
$\alpha, \beta, \gamma, \delta, \epsilon, \theta, \lambda, \mu, \pi, \sigma, \phi, \omega$
$\Alpha, \Beta, \Gamma, \Delta, \Theta, \Lambda, \Pi, \Sigma, \Phi, \Omega$
```

### **Matrices**
```
$$\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}$$
```

### **Fractions and Roots**
```
$\frac{numerator}{denominator}$
$\sqrt{x}$
$\sqrt[n]{x}$
```

---

## 🔧 **Technical Implementation**

### **What Was Added:**
1. **MathJax CDN Integration**: Automatically loads MathJax library
2. **CKEditor Support**: Math equations render in the editor
3. **Display Support**: Math renders properly in lesson views
4. **TypeScript Support**: Proper type declarations

### **How It Works:**
1. **Editor**: Teachers type math using LaTeX syntax
2. **Storage**: Math is stored as LaTeX in the database
3. **Display**: MathJax renders LaTeX as beautiful math equations
4. **Responsive**: Math scales properly on all devices

---

## 🎨 **Math Styling**

### **Automatic Features:**
- ✅ **Responsive**: Math scales with screen size
- ✅ **High Quality**: Vector-based rendering
- ✅ **Accessible**: Screen reader compatible
- ✅ **Print Ready**: Looks great when printed

### **Customization:**
Math equations automatically inherit your theme colors and styling.

---

## 📚 **LaTeX Math Reference**

### **Superscripts and Subscripts**
```
$x^2$          → x²
$x_1$          → x₁
$x^{2y}$       → x²ʸ
$x_{i+1}$      → xᵢ₊₁
```

### **Fractions**
```
$\frac{a}{b}$  → a/b
$\dfrac{a}{b}$ → a/b (display style)
```

### **Roots**
```
$\sqrt{x}$     → √x
$\sqrt[n]{x}$  → ⁿ√x
```

### **Integrals**
```
$\int f(x) dx$           → ∫f(x)dx
$\int_{a}^{b} f(x) dx$   → ∫ᵇₐf(x)dx
```

### **Sums and Products**
```
$\sum_{i=1}^{n} x_i$     → Σⁿᵢ₌₁xᵢ
$\prod_{i=1}^{n} x_i$    → ∏ⁿᵢ₌₁xᵢ
```

### **Limits**
```
$\lim_{x \to 0} f(x)$    → limˣ→⁰f(x)
```

### **Greek Letters**
```
$\alpha$ → α    $\beta$ → β    $\gamma$ → γ
$\delta$ → δ    $\epsilon$ → ε  $\theta$ → θ
$\lambda$ → λ   $\mu$ → μ      $\pi$ → π
$\sigma$ → σ    $\phi$ → φ     $\omega$ → ω
```

---

## 🚀 **Usage Examples for Teachers**

### **Mathematics Lessons**
```
The quadratic formula is: $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$

For the equation $x^2 - 5x + 6 = 0$:
- $a = 1$, $b = -5$, $c = 6$
- $x = \frac{5 \pm \sqrt{25 - 24}}{2} = \frac{5 \pm 1}{2}$
- Solutions: $x = 3$ or $x = 2$
```

### **Physics Lessons**
```
Newton's second law: $F = ma$

The kinetic energy formula: $KE = \frac{1}{2}mv^2$

Einstein's mass-energy equivalence: $E = mc^2$
```

### **Chemistry Lessons**
```
The ideal gas law: $PV = nRT$

Where:
- $P$ = pressure
- $V$ = volume  
- $n$ = number of moles
- $R$ = gas constant
- $T$ = temperature
```

---

## 🎯 **Best Practices**

### **For Teachers:**
1. **Use inline math** for equations within sentences
2. **Use display math** for important equations that should stand out
3. **Test your math** by previewing the lesson
4. **Keep it simple** - complex equations can be hard to read on mobile

### **For Students:**
1. **Math renders automatically** - no special viewing needed
2. **Zoom in** on mobile devices if math appears small
3. **Math is searchable** - you can copy/paste LaTeX if needed

---

## 🔍 **Troubleshooting**

### **Math Not Rendering?**
1. Check your internet connection (MathJax loads from CDN)
2. Refresh the page
3. Check for typos in LaTeX syntax

### **Common LaTeX Errors:**
- Missing `$` signs: `x^2` ❌ → `$x^2$` ✅
- Unmatched braces: `\frac{a{b}` ❌ → `\frac{a}{b}` ✅
- Wrong backslashes: `/frac{a}{b}` ❌ → `\frac{a}{b}` ✅

---

## 🎉 **Ready to Use!**

Your lesson system now supports beautiful, professional math equations. Teachers can create rich mathematical content that renders perfectly for students on all devices.

**Start creating math-rich lessons today!** 📐✨
