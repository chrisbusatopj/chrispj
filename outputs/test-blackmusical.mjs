import assert from 'node:assert/strict'
import handler from '../server/blackmusical.js'
const valid={id:'12345678-1234-1234-1234-123456789abc',nome:'Teste Local',telefone:'11987654321',plano:'anual',aluno:false}
async function run(body=valid){const res={setHeader(){},status(code){this.code=code;return this},json(body){this.body=body;return this}};await handler({method:'POST',headers:{'content-type':'application/json'},body},res);return res}
for(const key of Object.keys(process.env)) if(key.startsWith('BLACKMUSICAL_')) delete process.env[key]
assert.equal((await run()).code,503)
assert.equal((await run({...valid,telefone:'11111111111'})).code,400)
assert.equal((await run({...valid,aluno:true,email:'teste@example.com'})).code,503)
process.env.BLACKMUSICAL_ALUNOS_EMAILS='teste@example.com'
assert.equal((await run({...valid,aluno:true,email:'outro@example.com'})).body.elegivel,false)
let saves=0
const original=globalThis.fetch
globalThis.fetch=async()=>{saves++;return {ok:true,status:200,json:async()=>({ok:true})}}
for(const plano of ['anual','semestral']) for(const aluno of [false,true]){
 process.env[`BLACKMUSICAL_CHECKOUT_${plano.toUpperCase()}_${aluno?'ALUNO':'PADRAO'}`]=`https://pay.cakto.com.br/test-${plano}-${aluno}`
 const result=await run({...valid,plano,aluno,email:' TESTE@example.com '.trim()})
 assert.equal(result.code,200);assert.equal(result.body.elegivel,aluno);assert.ok(result.body.checkoutUrl.endsWith(`test-${plano}-${aluno}`))
}
assert.equal(saves,4)
globalThis.fetch=async()=>{throw Error('simulated')}
assert.equal((await run()).code,502)
globalThis.fetch=original
console.log('OK: quatro checkouts, allowlist normalizada, fallback, configuração ausente, telefone inválido e falha da planilha. Nenhum contato real enviado.')
