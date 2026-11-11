import assert from 'node:assert/strict'
import handler from '../server/blackmusical.js'
import { alunosBlackMusical } from '../server/blackmusical-alunos.js'
const valid={id:'12345678-1234-1234-1234-123456789abc',nome:'Teste Local',telefone:'11987654321',plano:'anual',aluno:false}
async function run(body=valid){const res={setHeader(){},status(code){this.code=code;return this},json(body){this.body=body;return this}};await handler({method:'POST',headers:{'content-type':'application/json'},body},res);return res}
for(const key of Object.keys(process.env)) if(key.startsWith('BLACKMUSICAL_')) delete process.env[key]
let saves=0
const original=globalThis.fetch
globalThis.fetch=async()=>{saves++;return {ok:true,status:200,json:async()=>({ok:true})}}
try {
 assert.equal(alunosBlackMusical.length,44)
 assert.equal(new Set(alunosBlackMusical).size,44)
 assert.equal((await run({...valid,aluno:true,email:'fora-da-lista@example.com'})).body.elegivel,false)
 assert.equal(saves,0)
 const expected={anual:['pj42tqs','3ag5fxx'],semestral:['umehfhs','3ehqxnn']}
 for(const plano of ['anual','semestral']) for(const aluno of [false,true]){
  const result=await run({...valid,plano,aluno,email:alunosBlackMusical[0].toUpperCase()})
  assert.equal(result.code,200);assert.equal(result.body.elegivel,aluno)
  assert.equal(result.body.checkoutUrl,`https://pay.cakto.com.br/${expected[plano][Number(aluno)]}`)
 }
 assert.equal(saves,4)
 assert.equal((await run({...valid,telefone:'11111111111'})).code,400)
 process.env.BLACKMUSICAL_ALUNOS_EMAILS=''
 assert.equal((await run({...valid,aluno:true,email:'teste@example.com'})).code,503)
 process.env.BLACKMUSICAL_CHECKOUT_ANUAL_PADRAO='http://example.com'
 assert.equal((await run()).code,503)
 delete process.env.BLACKMUSICAL_CHECKOUT_ANUAL_PADRAO
 globalThis.fetch=async()=>{throw Error('simulated')}
 assert.equal((await run()).code,502)
 console.log('OK: quatro destinos reais, lista de 44 alunos, telefone, falhas e bloqueio de e-mail inelegível. Sem envio real de contatos.')
} finally {globalThis.fetch=original}
