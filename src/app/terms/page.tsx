
export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="prose dark:prose-invert lg:prose-xl space-y-6">
        <h1 className="text-4xl font-bold">Termos de Serviço da SONGNATION</h1>
        <p className="text-muted-foreground">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

        <p>Bem-vindo à SONGNATION! Estes Termos de Serviço ("Termos") governam seu acesso e uso da nossa plataforma, um marketplace de propriedade intelectual focado em composições musicais. Ao usar nossos serviços, você concorda com estes Termos em sua totalidade.</p>

        <h2 className="text-2xl font-semibold">1. A Plataforma SONGNATION</h2>
        <p>A SONGNATION ("Plataforma") é um serviço online que conecta compositores, letristas e produtores ("Vendedores") com artistas, cantores e intérpretes ("Compradores") com o objetivo de licenciar e transferir direitos sobre composições musicais ("Obras").</p>
        <p>Reconhecemos que nosso produto principal é a propriedade intelectual. Nosso compromisso é garantir um ambiente seguro, transparente e juridicamente sólido para todas as transações.</p>

        <h2 className="text-2xl font-semibold">2. Papéis e Responsabilidades</h2>
        <h3 className="text-xl font-semibold">2.1. Para Vendedores (Compositores/Letristas)</h3>
        <ul>
          <li><strong>Propriedade:</strong> Você declara ser o único e exclusivo detentor dos direitos autorais sobre as Obras que disponibiliza na Plataforma.</li>
          <li><strong>Conteúdo:</strong> Você é responsável por fornecer informações precisas sobre suas Obras, incluindo gênero, tema, e anexar guias de melodia, se aplicável.</li>
          <li><strong>Monetização:</strong> Você define o preço de suas Obras e concorda com as taxas de serviço da SONGNATION, que serão deduzidas do valor final da venda.</li>
        </ul>

        <h3 className="text-xl font-semibold">2.2. Para Compradores (Artistas/Cantores)</h3>
        <ul>
          <li><strong>Licenciamento:</strong> Ao comprar uma Obra, você adquire uma licença de uso conforme os termos específicos da transação (ex: Cessão Total de Direitos, Licenciamento para uma única gravação).</li>
          <li><strong>Uso Correto:</strong> Você concorda em usar a Obra adquirida dentro dos limites da licença. Qualquer uso não autorizado constitui uma violação destes Termos e da lei de direitos autorais.</li>
          <li><strong>Pagamento:</strong> Você concorda em pagar o preço estipulado pela Obra no momento da transação.</li>
        </ul>

        <h2 className="text-2xl font-semibold">3. Propriedade Intelectual e Royalties</h2>
        <p>A SONGNATION facilita a transação dos direitos patrimoniais da Obra. É crucial entender que os direitos de execução pública (gerenciados por entidades como o ECAD no Brasil) podem permanecer com o autor original, a menos que especificado de outra forma no contrato de cessão.</p>
        <p>Nossos modelos de contrato automatizados visam esclarecer o escopo da cessão de direitos, garantindo transparência sobre como os royalties futuros serão gerenciados.</p>

        <h2 className="text-2xl font-semibold">4. Conduta do Usuário</h2>
        <p>Você concorda em não usar a Plataforma para:</p>
        <ul>
          <li>Violar qualquer lei ou direito de terceiros.</li>
          <li>Disponibilizar Obras que você não possui.</li>
          <li>Distribuir spam ou qualquer forma de comunicação não solicitada.</li>
          <li>Tentar manipular preços ou o sistema de avaliações.</li>
        </ul>
        <p>Reservamo-nos o direito de remover conteúdo e suspender contas que violem estes Termos.</p>

        <h2 className="text-2xl font-semibold">5. Limitação de Responsabilidade</h2>
        <p>A SONGNATION atua como intermediária, conectando Vendedores e Compradores. Não nos responsabilizamos pela qualidade, originalidade ou legalidade das Obras. A responsabilidade final pela veracidade das informações e pela conformidade legal da Obra é do Vendedor.</p>
        <p>Nossa responsabilidade limita-se a fornecer uma plataforma funcional, segura e com contratos juridicamente sólidos para facilitar as transações.</p>

        <h2 className="text-2xl font-semibold">6. Modificações dos Termos</h2>
        <p>Podemos revisar estes Termos periodicamente. A versão mais recente estará sempre disponível em nosso site. Se uma alteração for material, notificaremos você. Ao continuar usando a Plataforma após as alterações, você concorda com os novos Termos.</p>

        <h2 className="text-2xl font-semibold">7. Contato</h2>
        <p>Para qualquer dúvida sobre estes Termos, entre em contato conosco através dos canais oficiais disponibilizados na plataforma.</p>
      </div>
    </div>
  );
}
