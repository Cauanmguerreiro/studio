
export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="prose dark:prose-invert lg:prose-xl space-y-6">
        <h1 className="text-4xl font-bold">Política de Privacidade da SONGNATION</h1>
        <p className="text-muted-foreground">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

        <p>A sua privacidade é fundamental para a SONGNATION. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais ao utilizar nossa plataforma de marketplace de composições musicais.</p>

        <h2 className="text-2xl font-semibold">1. Informações que Coletamos</h2>
        <p>Coletamos informações para fornecer e melhorar nossos serviços. Isso inclui:</p>
        <ul>
          <li><strong>Informações de Cadastro:</strong> Quando você cria uma conta, coletamos dados como seu nome, nome artístico, e-mail, e informações de contato.</li>
          <li><strong>Informações do Perfil:</strong> Você pode optar por fornecer informações adicionais em seu perfil, como biografia, fotos e links para redes sociais.</li>
          <li><strong>Conteúdo da Obra:</strong> Coletamos as Obras que você (Vendedor) envia para a plataforma, incluindo arquivos de letra (.txt, .pdf) e guias de melodia (áudio), bem como metadados associados (gênero, tema).</li>
          <li><strong>Dados de Transação:</strong> Coletamos informações sobre as transações que você realiza, como as Obras que compra ou vende, preços e dados de pagamento processados por nossos parceiros.</li>
          <li><strong>Dados de Uso:</strong> Coletamos informações sobre como você interage com a plataforma, como páginas visitadas, buscas realizadas e filtros aplicados.</li>
        </ul>

        <h2 className="text-2xl font-semibold">2. Como Usamos Suas Informações</h2>
        <p>Utilizamos suas informações para:</p>
        <ul>
          <li>Operar e manter a plataforma SONGNATION.</li>
          <li>Facilitar a conexão e as transações entre Vendedores e Compradores.</li>
          <li>Personalizar sua experiência, recomendando Obras ou perfis relevantes.</li>
          <li>Processar pagamentos e garantir a segurança das transações.</li>
          <li>Comunicar-se com você sobre sua conta, serviços e atualizações importantes.</li>
          <li>Melhorar nossos serviços e desenvolver novos recursos, como as "Letras Sob Encomenda" e playlists "Songnation Hits".</li>
        </ul>

        <h2 className="text-2xl font-semibold">3. Compartilhamento de Informações</h2>
        <p>Não vendemos suas informações pessoais. Suas informações podem ser compartilhadas da seguinte forma:</p>
        <ul>
          <li><strong>Com Outros Usuários:</strong> Seu nome artístico e perfil público são visíveis para outros usuários da plataforma para facilitar a descoberta e a conexão.</li>
          <li><strong>Para Fins de Transação:</strong> As informações necessárias para concluir uma transação de licenciamento ou cessão de direitos serão compartilhadas entre o Comprador e o Vendedor, conforme estipulado nos contratos.</li>
          <li><strong>Prestadores de Serviço:</strong> Podemos compartilhar informações com terceiros que nos auxiliam na operação da plataforma, como processadores de pagamento e serviços de hospedagem, que estão contratualmente obrigados a proteger suas informações.</li>
          <li><strong>Por Obrigação Legal:</strong> Podemos divulgar suas informações se exigido por lei ou para proteger os direitos, a propriedade ou a segurança da SONGNATION, de nossos usuários ou do público.</li>
        </ul>

        <h2 className="text-2xl font-semibold">4. Segurança dos Dados</h2>
        <p>Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum sistema é 100% seguro, e não podemos garantir segurança absoluta.</p>

        <h2 className="text-2xl font-semibold">5. Seus Direitos e Escolhas</h2>
        <p>Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Você pode gerenciar as informações do seu perfil diretamente em sua conta ou entrando em contato conosco.</p>

        <h2 className="text-2xl font-semibold">6. Mudanças nesta Política</h2>
        <p>Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações significativas, publicando a nova política na plataforma. Seu uso continuado dos serviços após a data de vigência constituirá sua aceitação da política revisada.</p>

        <h2 className="text-2xl font-semibold">7. Contato</h2>
        <p>Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco através dos canais oficiais da SONGNATION.</p>
      </div>
    </div>
  );
}
