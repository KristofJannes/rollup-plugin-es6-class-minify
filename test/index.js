const chai = require('chai')
const es6ClassMinify = require('../src/index')

chai.should()

describe('es6-class-minify', () => {
  describe('Class methods', () => {
    describe('Class method declarations', () => {
      it("does't minify the constructor with 0 arguments", () => {
        const { code } = es6ClassMinify().transform('class A{constructor(){}}')
        code.should.equal('class A{constructor(){}}')
      })

      it("does't minify the constructor with 1 argument", () => {
        const { code } = es6ClassMinify().transform(
          'class A{constructor(arg1){}}'
        )
        code.should.equal('class A{constructor(arg1){}}')
      })

      it("does't minify the constructor with 2 arguments", () => {
        const { code } = es6ClassMinify().transform(
          'class A{constructor(arg1,arg2){}}'
        )
        code.should.equal('class A{constructor(arg1,arg2){}}')
      })

      it('minifies class method declarations with 0 arguments', () => {
        const { code } = es6ClassMinify().transform('class A{$test(){}}')
        code.should.equal('class A{a(){}}')
      })

      it('minifies class method declarations with 1 argument', () => {
        const { code } = es6ClassMinify().transform('class A{$test(arg1){}}')
        code.should.equal('class A{a(arg1){}}')
      })

      it('minifies class method declarations with 2 arguments', () => {
        const { code } = es6ClassMinify().transform(
          'class A{$test(arg1,arg2){}}'
        )
        code.should.equal('class A{a(arg1,arg2){}}')
      })

      it('minifies multiple class method declarations', () => {
        const { code } = es6ClassMinify().transform(
          'class A{$test(){}$method(){}}'
        )
        code.should.equal('class A{a(){}b(){}}')
      })

      it('minifies many class method declarations', () => {
        const { code } = es6ClassMinify().transform(
          'class A{$method1(){}$method2(){}$method3(){}$method4(){}$method5(){}$method6(){}$method7(){}$method8(){}$method9(){}$method10(){}$method11(){}$method12(){}$method13(){}$method14(){}$method15(){}$method16(){}$method17(){}$method18(){}$method19(){}$method20(){}$method21(){}$method22(){}$method23(){}$method24(){}$method25(){}$method26(){}$method27(){}$method28(){}$method29(){}$method30(){}$method31(){}$method32(){}$method33(){}$method34(){}$method35(){}$method36(){}$method37(){}$method38(){}$method39(){}$method40(){}$method41(){}$method42(){}$method43(){}$method44(){}$method45(){}$method46(){}$method47(){}$method48(){}$method49(){}$method50(){}$method51(){}$method52(){}$method53(){}$method54(){}$method55(){}$method56(){}$method57(){}$method58(){}$method59(){}$method60(){}$method61(){}$method62(){}$method63(){}$method64(){}$method65(){}$method66(){}$method67(){}$method68(){}$method69(){}$method70(){}$method71(){}$method72(){}$method73(){}$method74(){}$method75(){}$method76(){}$method77(){}$method78(){}$method79(){}$method80(){}$method81(){}$method82(){}$method83(){}$method84(){}$method85(){}$method86(){}$method87(){}$method88(){}$method89(){}$method90(){}$method91(){}$method92(){}$method93(){}$method94(){}$method95(){}$method96(){}$method97(){}$method98(){}$method99(){}$method100(){}$method101(){}$method102(){}$method103(){}$method104(){}$method105(){}}'
        )
        code.should.equal(
          'class A{a(){}b(){}c(){}d(){}e(){}f(){}g(){}h(){}i(){}j(){}k(){}l(){}m(){}n(){}o(){}p(){}q(){}r(){}s(){}t(){}u(){}v(){}w(){}x(){}y(){}z(){}A(){}B(){}C(){}D(){}E(){}F(){}G(){}H(){}I(){}J(){}K(){}L(){}M(){}N(){}O(){}P(){}Q(){}R(){}S(){}T(){}U(){}V(){}W(){}X(){}Y(){}Z(){}aa(){}ab(){}ac(){}ad(){}ae(){}af(){}ag(){}ah(){}ai(){}aj(){}ak(){}al(){}am(){}an(){}ao(){}ap(){}aq(){}ar(){}as(){}at(){}au(){}av(){}aw(){}ax(){}ay(){}az(){}aA(){}aB(){}aC(){}aD(){}aE(){}aF(){}aG(){}aH(){}aI(){}aJ(){}aK(){}aL(){}aM(){}aN(){}aO(){}aP(){}aQ(){}aR(){}aS(){}aT(){}aU(){}aV(){}aW(){}aX(){}aY(){}aZ(){}ba(){}}'
        )
      })
    })

    describe('Class method access', () => {
      let es6ClassMinify1
      beforeEach(() => {
        es6ClassMinify1 = es6ClassMinify()
        es6ClassMinify1.transform('class A{test(){}}')
      })

      it('minifies class method access with 0 arguments', () => {
        const { code } = es6ClassMinify1.transform('a.$test()')
        code.should.equal('a.a()')
      })

      it('minifies class method access with 1 argument', () => {
        const { code } = es6ClassMinify1.transform('a.$test(0)')
        code.should.equal('a.a(0)')
      })

      it('minifies class method access with 2 arguments', () => {
        const { code } = es6ClassMinify1.transform('a.$test(0, true)')
        code.should.equal('a.a(0, true)')
      })

      it('minifies class method access on this', () => {
        const { code } = es6ClassMinify1.transform('this.$test()')
        code.should.equal('this.a()')
      })

      it('minifies class method access with complex arguments (1)', () => {
        const { code } = es6ClassMinify1.transform(
          'this.$test(new Uint8Array(5))'
        )
        code.should.equal('this.a(new Uint8Array(5))')
      })

      it('minifies class method access with complex arguments (2)', () => {
        const { code } = es6ClassMinify1.transform(
          'this.$test(await this.call(new Uint8Array(0x8)))'
        )
        code.should.equal('this.a(await this.call(new Uint8Array(0x8)))')
      })

      it('minifies class method access with complex arguments (2)', () => {
        const { code } = es6ClassMinify1.transform(
          'this.$test(await this.call(new Uint8Array(0x8)))'
        )
        code.should.equal('this.a(await this.call(new Uint8Array(0x8)))')
      })

      it('minifies class method access for assignment', () => {
        const { code } = es6ClassMinify1.transform('a.$test=()=>{}')
        code.should.equal('a.a=()=>{}')
      })

      it('minifies class method access to assignment', () => {
        const { code } = es6ClassMinify1.transform('const b=a.$test;')
        code.should.equal('const b=a.a;')
      })
    })
  })

  describe('Class properties', () => {
    describe('Class property declarations', () => {
      it('minifies class properties', () => {
        const { code } = es6ClassMinify().transform(
          'class A{constructor(){this.$test=0}}'
        )
        code.should.equal('class A{constructor(){this.a=0}}')
      })
    })

    describe('Class property access', () => {
      let es6ClassMinify1
      beforeEach(() => {
        es6ClassMinify1 = es6ClassMinify()
        es6ClassMinify1.transform('class A{constructor(){this.$test=0}};')
      })

      it('minifies class property assignment', async () => {
        const { code } = es6ClassMinify1.transform('a.$test=1;')
        code.should.equal('a.a=1;')
      })

      it('minifies class property indexing', async () => {
        const { code } = es6ClassMinify1.transform('a.$test[0]=1;')
        code.should.equal('a.a[0]=1;')
      })

      it('minifies class property calling', async () => {
        const { code } = es6ClassMinify1.transform('a.$test();')
        code.should.equal('a.a();')
      })

      it('minifies class property sub-property', async () => {
        const { code } = es6ClassMinify1.transform('a.$test.ok=!0;')
        code.should.equal('a.a.ok=!0;')
      })

      it('minifies class property access with comma', async () => {
        const { code } = es6ClassMinify1.transform('const b=a.$test,b;')
        code.should.equal('const b=a.a,b;')
      })

      it('minifies class property access with ++', async () => {
        const { code } = es6ClassMinify1.transform('a.$test++;')
        code.should.equal('a.a++;')
      })

      it('minifies class property access with --', async () => {
        const { code } = es6ClassMinify1.transform('a.$test--;')
        code.should.equal('a.a--;')
      })

      it('minifies class property access with +=', async () => {
        const { code } = es6ClassMinify1.transform('a.$test+=5;')
        code.should.equal('a.a+=5;')
      })

      it('minifies class property access with -=', async () => {
        const { code } = es6ClassMinify1.transform('a.$test-=5;')
        code.should.equal('a.a-=5;')
      })

      it('minifies class property access with )', async () => {
        const { code } = es6ClassMinify1.transform('console.log(a.$test);')
        code.should.equal('console.log(a.a);')
      })
    })
  })
})
