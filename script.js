/* ==========================================================================
   SOLAR DO LOUREIRO | LINK IN BIO — LOGICA INTERATIVA & EMENTA MULTILINGUE
   Menu Oficial com 16 Categorias traduzido em 4 idiomas (PT, EN, FR, ES)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Elementos do DOM
  const shareBtn = document.getElementById('shareBtn');
  const shareModal = document.getElementById('shareModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const copyUrlBtn = document.getElementById('copyUrlBtn');
  const copyBtnText = document.getElementById('copyBtnText');
  const shareUrlInput = document.getElementById('shareUrlInput');
  const displayUrlText = document.getElementById('displayUrlText');
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  const qrCanvas = document.getElementById('qrCanvas');
  const bgVideo = document.getElementById('bgVideo');

  // Dados dinamicos de partilha
  const shareData = {
    title: 'SOLAR DO LOUREIRO | Comida Tradicional Portuguesa',
    text: 'Conheça o Solar do Loureiro no Largo do Chão do Loureiro, Lisboa.',
    url: window.location.href.startsWith('http') ? window.location.href : 'https://maps.app.goo.gl/aqwVyijSwmpJV8vP8'
  };

  if (shareUrlInput) shareUrlInput.value = shareData.url;
  if (displayUrlText) {
    displayUrlText.textContent = 'Largo do Chão do Loureiro 2, Lisboa';
  }

  // --------------------------------------------------------------------------
  // VIDEO DE FUNDO AUTOPLAY
  // --------------------------------------------------------------------------
  if (bgVideo) {
    bgVideo.muted = true;
    bgVideo.volume = 0;
    const playPromise = bgVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const playOnInteraction = () => {
          bgVideo.play().catch(() => {});
          window.removeEventListener('touchstart', playOnInteraction);
          window.removeEventListener('click', playOnInteraction);
        };
        window.addEventListener('touchstart', playOnInteraction, { once: true });
        window.addEventListener('click', playOnInteraction, { once: true });
      });
    }
  }

  // --------------------------------------------------------------------------
  // BOTAO DE PARTILHA (Canto Superior Direito)
  // --------------------------------------------------------------------------
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      if (navigator.share && window.innerWidth < 768) {
        try {
          await navigator.share(shareData);
          showToast('Perfil partilhado com sucesso!');
          return;
        } catch (err) {
          if (err.name === 'AbortError') return;
        }
      }
      openShareModal();
    });
  }

  function openShareModal() {
    if (!shareModal) return;
    shareModal.classList.add('active');
    shareModal.setAttribute('aria-hidden', 'false');
    drawQRCode(qrCanvas, shareData.url);
    document.body.style.overflow = 'hidden';
  }

  function closeShareModal() {
    if (!shareModal) return;
    shareModal.classList.remove('active');
    shareModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeShareModal);
  if (shareModal) {
    shareModal.addEventListener('click', (e) => {
      if (e.target === shareModal) closeShareModal();
    });
  }

  // --------------------------------------------------------------------------
  // EMENTA MULTILINGUE REAL (PT, EN, FR, ES) + DETECAO INTELIGENTE
  // --------------------------------------------------------------------------
  const btnVerEmenta = document.getElementById('btn-ver-ementa');
  const ementaModal = document.getElementById('ementaModal');
  const closeEmentaBtn = document.getElementById('closeEmentaBtn');
  const ementaCategoriesContainer = document.getElementById('ementaCategoriesContainer');
  const ementaModalTitle = document.getElementById('ementaModalTitle');
  const ementaNoticeBadge = document.getElementById('ementaNoticeBadge');
  const langDetectedText = document.getElementById('langDetectedText');
  const ementaInstagramCta = document.getElementById('ementaInstagramCta');
  const langButtons = document.querySelectorAll('.lang-btn');

  const EMENTA_DATA = {
    pt: {
      title: 'Ementa Oficial · Solar do Loureiro',
      notice: '✨ Cozinha Tradicional Portuguesa · Confeção diária com produtos frescos.',
      detectedText: 'Idioma do telemóvel detetado: Português',
      instagramCta: 'Acompanhar Novidades no Instagram',
      categories: [
        {
          icon: '🥖',
          name: 'Couvert',
          dishes: [
            { name: 'Couvert Completo', desc: 'Pão, patê de bacalhau, manteiga e azeitonas', price: '7.00€' },
            { name: 'Pão', desc: '', price: '2.10€' },
            { name: 'Manteiga', desc: '', price: '1.00€' },
            { name: 'Azeitonas', desc: '', price: '1.50€' },
            { name: 'Patê de Bacalhau', desc: '', price: '3.50€' },
            { name: 'Queijo', desc: '', price: '4.50€' },
            { name: 'Presunto Ibérico', desc: '', price: '12.00€' },
            { name: 'Croquetes de Carne (2 unidades)', desc: '', price: '4.00€' }
          ]
        },
        {
          icon: '🧆',
          name: 'Entradas',
          dishes: [
            { name: 'Caldo Verde', desc: '', price: '4.50€' },
            { name: 'Sopa de Peixe', desc: '', price: '6.50€' },
            { name: 'Pastel de Bacalhau (2 unidades)', desc: '', price: '4.00€' },
            { name: 'Ostras Frescas (4 unidades)', desc: '', price: '9.50€' },
            { name: 'Ostras Frescas (10 unidades)', desc: '', price: '23.50€' },
            { name: 'Gambas ao Alho', desc: 'Camarão limpo, azeite, alho e vinho branco', price: '13.50€' },
            { name: 'Amêijoas à Bulhão Pato', desc: 'Amêijoas, azeite, alho, vinho branco e manteiga', price: '12.00€' },
            { name: 'Chouriço Assado', desc: '', price: '8.50€' },
            { name: 'Tábua de Queijos', desc: 'Queijo seco, queijo da serra, queijo brie e azeitonas', price: '10.50€' },
            { name: 'Tábua Mista', desc: 'Mozarela de búfalo, queijo seco, azeitonas, presunto e paio', price: '12.50€' }
          ]
        },
        {
          icon: '🥗',
          name: 'Saladas',
          dishes: [
            { name: 'Salada de Tomate', desc: 'Tomate fatiado, cebola e sal', price: '4.00€' },
            { name: 'Salada Mista', desc: 'Alface, cenoura, cebola, pepino e tomate', price: '4.50€' },
            { name: 'Salada de Polvo', desc: 'Cebola, pimentos, azeite, vinagre e polvo fatiado', price: '9.50€' },
            { name: 'Salada de Bacalhau', desc: 'Alface, grão-de-bico, batata cozida, cebola e azeitonas', price: '11.50€' }
          ]
        },
        {
          icon: '🐟',
          name: 'Peixe',
          dishes: [
            { name: 'Salmão', desc: 'Lombo de salmão no forno, batata a murro e legumes salteados', price: '15.50€' },
            { name: 'Polvo à Lagareiro', desc: 'Polvo salteado, alho no azeite, batata a murro e legumes', price: '20.50€' },
            { name: 'Garoupa Posta', desc: 'Garoupa no forno, alho no azeite, batata a murro e legumes', price: '21.00€' },
            { name: 'Pregado Posta', desc: 'Pregado no forno, alho no azeite, batata a murro e legumes', price: '22.00€' }
          ]
        },
        {
          icon: '🥘',
          name: 'Bacalhau',
          dishes: [
            { name: 'Bacalhau à Brás', desc: 'Bacalhau desfiado, batata palha, ovo, cebola, azeitonas e coentros', price: '15.00€' },
            { name: 'Bacalhau com Natas', desc: 'Bacalhau desfiado, batata cozida em cubos, natas e queijo mozarela', price: '15.00€' },
            { name: 'Camarão com Natas', desc: 'Gambas fatiadas, batata cozida em cubos, natas e queijo mozarela', price: '16.00€' },
            { name: 'Bacalhau à Gomes de Sá', desc: 'Bacalhau desfiado, cebola, ovo cozido, batata cozida, pimenta preta, azeitonas e coentros', price: '16.50€' },
            { name: 'Bacalhau Espiritual', desc: 'Bacalhau desfiado, pão, leite, cebola, alho, cenoura, molho bechamel, azeite, nata e queijo ralado', price: '17.00€' },
            { name: 'Bacalhau na Telha', desc: 'Lombo de bacalhau grelhado, alho no azeite, batata a murro e legumes', price: '18.50€' }
          ]
        },
        {
          icon: '🍲',
          name: 'No Tacho',
          dishes: [
            { name: 'Arroz de Pato', desc: 'Pato desfiado, chouriço de carne, bacon, cebola, cenoura, alho, louro, vinho do porto e pimenta preta', price: '15.50€' },
            { name: 'Arroz de Gambas', desc: 'Gambas limpas, cebola, pimentos, molho de tomate, algas marinhas e coentros', price: '1px: 16.50€ | 2px: 31.00€' },
            { name: 'Arroz de Lingueirão', desc: 'Lingueirão, cebola, alho, molho de tomate, pimentos, vinho branco, louro, cravo, azeite e coentros', price: '1px: 17.50€ | 2px: 33.00€' },
            { name: 'Arroz de Polvo', desc: 'Polvo fatiado, cebola, pimentos, molho de tomate, algas marinhas e coentros', price: '1px: 19.50€ | 2px: 35.50€' },
            { name: 'Arroz de Marisco', desc: 'Camarão tigre, gambas, mexilhão, amêijoas, lulas, cebola, pimentos, molho de tomate, algas marinhas e coentros', price: '1px: 21.50€ | 2px: 41.00€' },
            { name: 'Cataplana de Marisco', desc: 'Lagosta, gambas, mexilhão, amêijoas, lulas, cebola, pimentos, algas marinhas, molho de tomate, coentros e batata cozida', price: '1px: 25.00€ | 2px: 48.00€' }
          ]
        },
        {
          icon: '🥩',
          name: 'Carne',
          dishes: [
            { name: 'Peito de Frango', desc: 'Peito de frango salteado, batata a murro e legumes', price: '13.50€' },
            { name: 'Frango Piri-Piri', desc: 'Perna de frango assada, batata a murro e legumes', price: '14.50€' },
            { name: 'Escalope de Porco ao Molho Madeira', desc: 'Lombo de porco fatiado, vinho da Madeira, presunto, farinha, batata a murro e legumes', price: '14.00€' },
            { name: 'Carne de Porco à Alentejana', desc: 'Cubos de lombo marinados no vinho, amêijoas, batata frita em cubos e picles', price: '16.00€' },
            { name: 'Bife da Vazia', desc: '300g de bife da vazia salteado, batata a murro e legumes', price: '18.50€' },
            { name: 'Picanha na Pedra', desc: 'Picanha fatiada, arroz, batata a murro, feijão preto e legumes', price: '65.00€ / kg' }
          ]
        },
        {
          icon: '🍝',
          name: 'Massas',
          dishes: [
            { name: 'Esparguete à Carbonara', desc: 'Bacon, ovo e queijo parmesão', price: '11.50€' },
            { name: 'Esparguete à Bolonhesa', desc: 'Carne bovina picada, molho de tomate, queijo parmesão e manjericão', price: '12.50€' },
            { name: 'Esparguete de Gambas', desc: 'Gambas limpas, molho de tomate, queijo parmesão e manjericão', price: '13.50€' },
            { name: 'Esparguete Pescatori', desc: 'Gambas, mexilhão, amêijoas, molho de tomate, queijo parmesão e manjericão', price: '14.50€' }
          ]
        },
        {
          icon: '🥔',
          name: 'Acompanhamentos',
          dishes: [
            { name: 'Batata a Murro', desc: '', price: '3.50€' },
            { name: 'Arroz Branco', desc: '', price: '3.50€' },
            { name: 'Feijão Preto', desc: '', price: '3.50€' },
            { name: 'Ovo Frito', desc: '', price: '3.50€' },
            { name: 'Legumes Salteados', desc: '', price: '3.50€' }
          ]
        },
        {
          icon: '🍮',
          name: 'Sobremesas',
          dishes: [
            { name: 'Baba de Camelo', desc: 'Mousse cremosa de leite condensado cozido', price: '4.00€' },
            { name: 'Leite-Creme', desc: 'Tradicional queimado com açúcar', price: '4.00€' },
            { name: 'Arroz-Doce', desc: 'Com canela em pó', price: '4.00€' },
            { name: 'Mousse de Chocolate', desc: 'Mousse artesanal cremosa', price: '4.00€' }
          ]
        },
        {
          icon: '☕',
          name: 'Cafetaria',
          dishes: [
            { name: 'Bica (Espresso)', desc: '', price: '1.20€' },
            { name: 'Café Pingado', desc: '', price: '1.50€' },
            { name: 'Café Americano', desc: '', price: '1.90€' },
            { name: 'Meia de Leite', desc: '', price: '2.10€' },
            { name: 'Café Duplo', desc: '', price: '2.50€' },
            { name: 'Descafeinado', desc: '', price: '1.80€' },
            { name: 'Descafeinado Duplo', desc: '', price: '3.00€' },
            { name: 'Cappuccino', desc: '', price: '3.50€' },
            { name: 'Chá / Infusão', desc: '', price: '2.90€' }
          ]
        },
        {
          icon: '🥤',
          name: 'Águas & Refrigerantes',
          dishes: [
            { name: 'Água Purificada sem Gás', desc: '', price: '1.80€' },
            { name: 'Água Purificada com Gás', desc: '', price: '2.10€' },
            { name: 'Água das Pedras', desc: '', price: '2.50€' },
            { name: 'Água Aromatizada', desc: '', price: '2.80€' },
            { name: 'Coca-Cola / Zero', desc: '', price: '3.10€' },
            { name: 'Fanta Laranja', desc: '', price: '3.10€' },
            { name: 'Ice Tea Pêssego / Limão', desc: '', price: '3.10€' },
            { name: 'Guaraná Antarctica', desc: '', price: '3.10€' },
            { name: 'Sumo de Laranja Natural', desc: '', price: '4.00€' },
            { name: 'Sumo de Morango Natural', desc: '', price: '5.00€' },
            { name: 'Abacaxi com Hortelã', desc: '', price: '5.50€' }
          ]
        },
        {
          icon: '🍺',
          name: 'Cervejas & Sidras',
          dishes: [
            { name: 'Imperial (20cl)', desc: '', price: '2.00€' },
            { name: 'Tulipa (30cl)', desc: '', price: '3.00€' },
            { name: 'Caneca (50cl)', desc: '', price: '4.50€' },
            { name: 'Cerveja Preta', desc: '', price: '3.00€' },
            { name: 'Cerveja sem Álcool', desc: '', price: '3.00€' },
            { name: 'Bandida do Pomar Tulipa (Sidra)', desc: '', price: '4.50€' },
            { name: 'Bandida do Pomar Caneca (Sidra)', desc: '', price: '6.50€' }
          ]
        },
        {
          icon: '🍹',
          name: 'Cocktails & Sangrias',
          dishes: [
            { name: 'Caipirinha', desc: '', price: '8.50€' },
            { name: 'Cuba Libre', desc: '', price: '8.00€' },
            { name: 'Aperol Spritz', desc: '', price: '9.50€' },
            { name: 'Limoncello Spritz', desc: '', price: '9.50€' },
            { name: 'Hugo Spritz', desc: '', price: '10.00€' },
            { name: 'Pisco Sour', desc: '', price: '10.00€' },
            { name: 'Sex on the Beach', desc: '', price: '10.50€' },
            { name: 'Dry Martini', desc: '', price: '12.00€' },
            { name: 'Espresso Martini', desc: '', price: '13.00€' },
            { name: 'Sangria Tinta (1.50 L)', desc: '', price: '17.50€' },
            { name: 'Sangria Branca (1.50 L)', desc: '', price: '17.50€' },
            { name: 'Sangria Espumante (1.50 L)', desc: '', price: '20.50€' }
          ]
        },
        {
          icon: '🍷',
          name: 'Vinhos & Espumantes',
          dishes: [
            { name: 'Vinho da Casa a Copo (Tinto / Branco / Verde / Rosé)', desc: '', price: '4.50€' },
            { name: 'Espumante / Sangria a Copo', desc: '', price: '6.00€' },
            { name: 'Vinho Tinto da Casa (½ Litro: 7.50€ | Jarro 1L: 13.50€)', desc: '', price: '7.50€ - 13.50€' },
            { name: 'Vinho Tinto Quintela', desc: '', price: '16.50€' },
            { name: 'Vinho Tinto Flor do Côa', desc: '', price: '18.50€' },
            { name: 'Vinho Tinto Arrábida Merlot', desc: '', price: '20.00€' },
            { name: 'Vinho Tinto Arrábida Cabernet Sauvignon', desc: '', price: '25.00€' },
            { name: 'Vinho Branco da Casa (½ Litro: 7.50€ | Jarro 1L: 12.50€)', desc: '', price: '7.50€ - 12.50€' },
            { name: 'Vinho Branco Quintela', desc: '', price: '15.50€' },
            { name: 'Vinho Branco Flor do Côa', desc: '', price: '17.50€' },
            { name: 'Vinho Branco Trinca Bolotas Chardonnay', desc: '', price: '18.50€' },
            { name: 'Vinho Branco Arrábida Sauvignon Blanc', desc: '', price: '22.00€' },
            { name: 'Vinho Verde (½ Litro: 7.50€ | Jarro 1L: 14.50€)', desc: '', price: '7.50€ - 14.50€' },
            { name: 'Vinho Verde Casal Garcia', desc: '', price: '15.50€' },
            { name: 'Vinho Verde Aveleda', desc: '', price: '17.50€' },
            { name: 'Vinho Verde Muralhas de Monção', desc: '', price: '19.00€' },
            { name: 'Vinho Verde Alvarinho', desc: '', price: '21.50€' },
            { name: 'Vinho Rosé (Copo: 4.50€ | Quintela: 14.00€ | Flor do Côa: 16.00€ | Mateus: 18.00€)', desc: '', price: '4.50€ - 18.00€' },
            { name: 'Espumante (Copo: 6.50€ | Lambrusco: 17.00€ | Perlino: 18.00€ | Murganheira: 22.50€ | Raposeira: 26.50€)', desc: '', price: '6.50€ - 26.50€' }
          ]
        },
        {
          icon: '🥃',
          name: 'Digestivos & Licores',
          dishes: [
            { name: 'Licores (Ginja 3.50€ | Licor Beirão 3.00€ | Moscatel 4.50€ | Vinho do Porto 5.00€ | Baileys 6.50€ | Limoncello 7.00€)', desc: '', price: '3.00€ - 7.00€' },
            { name: 'Digestivos (Bagaço 3.50€ | Aliança Velha 4.00€ | Vodka 5.50€ | Macieira 6.50€ | C.R.&F. 8.50€)', desc: '', price: '3.50€ - 8.50€' },
            { name: 'Whisky Novo (J&B 5.00€ | Jameson 6.50€ | Jack Daniel\'s 7.00€)', desc: '', price: '5.00€ - 7.00€' },
            { name: 'Whisky Velho (Cardhu 10.00€ | Ballantine\'s 11.50€ | Black Label 12.00€)', desc: '', price: '10.00€ - 12.00€' },
            { name: 'Gin (Gordon\'s 8.00€ | Tanqueray 9.50€ | Hendrick\'s 10.50€ | Bulldog 12.50€)', desc: '', price: '8.00€ - 12.50€' }
          ]
        }
      ]
    },

    en: {
      title: 'Official Menu · Solar do Loureiro',
      notice: '✨ Traditional Portuguese Cuisine · Prepared daily with fresh ingredients.',
      detectedText: 'Phone language detected: English',
      instagramCta: 'Follow Our News on Instagram',
      categories: [
        {
          icon: '🥖',
          name: 'Couvert',
          dishes: [
            { name: 'Full Couvert', desc: 'Bread, codfish pâté, butter and seasoned olives', price: '7.00€' },
            { name: 'Bread Basket', desc: '', price: '2.10€' },
            { name: 'Butter', desc: '', price: '1.00€' },
            { name: 'Marinated Olives', desc: '', price: '1.50€' },
            { name: 'Codfish Pâté', desc: '', price: '3.50€' },
            { name: 'Cheese', desc: '', price: '4.50€' },
            { name: 'Iberian Cured Ham', desc: '', price: '12.00€' },
            { name: 'Beef Croquettes (2 pcs)', desc: '', price: '4.00€' }
          ]
        },
        {
          icon: '🧆',
          name: 'Starters',
          dishes: [
            { name: 'Caldo Verde', desc: 'Traditional kale and potato broth', price: '4.50€' },
            { name: 'Fisherman\'s Soup', desc: '', price: '6.50€' },
            { name: 'Codfish Fritters (2 pcs)', desc: '', price: '4.00€' },
            { name: 'Fresh Oysters (4 pcs)', desc: '', price: '9.50€' },
            { name: 'Fresh Oysters (10 pcs)', desc: '', price: '23.50€' },
            { name: 'Garlic Prawns', desc: 'Peeled prawns, olive oil, garlic and white wine', price: '13.50€' },
            { name: 'Clams Bulhão Pato Style', desc: 'Clams in olive oil, garlic, white wine, butter & coriander', price: '12.00€' },
            { name: 'Charcoal-Grilled Chorizo', desc: '', price: '8.50€' },
            { name: 'Cheese Board', desc: 'Cured cheese, Serra cheese, Brie cheese and olives', price: '10.50€' },
            { name: 'Mixed Charcuterie Board', desc: 'Buffalo mozzarella, cured cheese, olives, cured ham, smoked pork loin', price: '12.50€' }
          ]
        },
        {
          icon: '🥗',
          name: 'Salads',
          dishes: [
            { name: 'Tomato Salad', desc: 'Sliced tomatoes, onion and sea salt', price: '4.00€' },
            { name: 'Mixed Garden Salad', desc: 'Lettuce, carrot, onion, cucumber and tomato', price: '4.50€' },
            { name: 'Octopus Salad', desc: 'Sliced octopus, onion, bell peppers, olive oil and vinegar', price: '9.50€' },
            { name: 'Codfish & Chickpea Salad', desc: 'Lettuce, chickpeas, boiled potatoes, onion and olives', price: '11.50€' }
          ]
        },
        {
          icon: '🐟',
          name: 'Fish',
          dishes: [
            { name: 'Oven-Baked Salmon', desc: 'Baked salmon fillet with crushed potatoes and sautéed vegetables', price: '15.50€' },
            { name: 'Octopus à Lagareiro', desc: 'Sautéed octopus, hot garlic olive oil, crushed potatoes and vegetables', price: '20.50€' },
            { name: 'Baked Grouper Steak', desc: 'Grouper steak with garlic olive oil, crushed potatoes and vegetables', price: '21.00€' },
            { name: 'Baked Turbot Steak', desc: 'Turbot steak with garlic olive oil, crushed potatoes and vegetables', price: '22.00€' }
          ]
        },
        {
          icon: '🥘',
          name: 'Codfish (Bacalhau)',
          dishes: [
            { name: 'Bacalhau à Brás', desc: 'Shredded codfish, straw potatoes, eggs, onion, olives and coriander', price: '15.00€' },
            { name: 'Bacalhau com Natas', desc: 'Creamy oven-baked cod with diced potatoes and mozzarella', price: '15.00€' },
            { name: 'Prawns com Natas', desc: 'Creamy oven-baked prawns with diced potatoes and mozzarella', price: '16.00€' },
            { name: 'Bacalhau à Gomes de Sá', desc: 'Flaked cod with onion, boiled egg, boiled potato, black pepper, olives and coriander', price: '16.50€' },
            { name: 'Bacalhau Espiritual', desc: 'Baked codfish with bread, milk, onion, garlic, carrot, béchamel and grated cheese', price: '17.00€' },
            { name: 'Bacalhau na Telha', desc: 'Grilled cod loin on ceramic tile, garlic olive oil, crushed potatoes & greens', price: '18.50€' }
          ]
        },
        {
          icon: '🍲',
          name: 'Pot Stews & Rice (No Tacho)',
          dishes: [
            { name: 'Duck Rice (Arroz de Pato)', desc: 'Shredded duck baked rice with chorizo, bacon, onion, carrot, port wine', price: '15.50€' },
            { name: 'Prawn Rice', desc: 'Peeled prawns, onion, peppers, rich tomato sauce, seaweed and coriander', price: '1p: 16.50€ | 2p: 31.00€' },
            { name: 'Razor Clam Rice', desc: 'Razor clams, onion, garlic, tomato sauce, white wine, cloves & coriander', price: '1p: 17.50€ | 2p: 33.00€' },
            { name: 'Octopus Rice', desc: 'Sliced octopus, onion, peppers, tomato sauce, seaweed and coriander', price: '1p: 19.50€ | 2p: 35.50€' },
            { name: 'Seafood Rice', desc: 'Tiger prawns, shrimp, mussels, clams, squid, seaweed and coriander', price: '1p: 21.50€ | 2p: 41.00€' },
            { name: 'Seafood Cataplana', desc: 'Lobster, prawns, mussels, clams, squid, seaweed, tomato sauce & potatoes', price: '1p: 25.00€ | 2p: 48.00€' }
          ]
        },
        {
          icon: '🥩',
          name: 'Meat',
          dishes: [
            { name: 'Chicken Breast', desc: 'Sautéed chicken breast, crushed potatoes and sautéed vegetables', price: '13.50€' },
            { name: 'Piri-Piri Roasted Chicken', desc: 'Spicy roast chicken leg, crushed potatoes and vegetables', price: '14.50€' },
            { name: 'Pork Escalope with Madeira Sauce', desc: 'Sliced pork loin in Madeira wine sauce, ham, crushed potatoes and vegetables', price: '14.00€' },
            { name: 'Pork Alentejana Style', desc: 'Marinated pork cubes in wine, fresh clams, diced fried potatoes and pickles', price: '16.00€' },
            { name: 'Sirloin Steak (Bife da Vazia)', desc: '300g sautéed sirloin steak, crushed potatoes and vegetables', price: '18.50€' },
            { name: 'Picanha on a Hot Stone', desc: 'Sliced picanha steak, white rice, crushed potatoes, black beans & vegetables', price: '65.00€ / kg' }
          ]
        },
        {
          icon: '🍝',
          name: 'Pasta',
          dishes: [
            { name: 'Spaghetti Carbonara', desc: 'Bacon, egg, and parmesan cheese', price: '11.50€' },
            { name: 'Spaghetti Bolognese', desc: 'Minced beef, tomato sauce, parmesan and basil', price: '12.50€' },
            { name: 'Prawn Spaghetti', desc: 'Peeled prawns, rich tomato sauce, parmesan and basil', price: '13.50€' },
            { name: 'Seafood Spaghetti Pescatori', desc: 'Prawns, mussels, clams, tomato sauce, parmesan and basil', price: '14.50€' }
          ]
        },
        {
          icon: '🥔',
          name: 'Side Dishes',
          dishes: [
            { name: 'Crushed Potatoes (Batata a Murro)', desc: '', price: '3.50€' },
            { name: 'White Rice', desc: '', price: '3.50€' },
            { name: 'Black Beans', desc: '', price: '3.50€' },
            { name: 'Fried Egg', desc: '', price: '3.50€' },
            { name: 'Sautéed Vegetables', desc: '', price: '3.50€' }
          ]
        },
        {
          icon: '🍮',
          name: 'Desserts',
          dishes: [
            { name: 'Baba de Camelo', desc: 'Creamy Portuguese dulce de leche mousse', price: '4.00€' },
            { name: 'Leite-Creme', desc: 'Traditional crème brûlée with caramel crust', price: '4.00€' },
            { name: 'Arroz-Doce', desc: 'Sweet rice pudding with cinnamon', price: '4.00€' },
            { name: 'Chocolate Mousse', desc: 'Rich artisanal chocolate mousse', price: '4.00€' }
          ]
        },
        {
          icon: '☕',
          name: 'Coffee & Tea',
          dishes: [
            { name: 'Espresso (Bica)', desc: '', price: '1.20€' },
            { name: 'Macchiato (Café Pingado)', desc: '', price: '1.50€' },
            { name: 'Americano', desc: '', price: '1.90€' },
            { name: 'White Coffee (Meia de Leite)', desc: '', price: '2.10€' },
            { name: 'Double Espresso', desc: '', price: '2.50€' },
            { name: 'Decaffeinated', desc: '', price: '1.80€' },
            { name: 'Double Decaf', desc: '', price: '3.00€' },
            { name: 'Cappuccino', desc: '', price: '3.50€' },
            { name: 'Tea / Infusion', desc: '', price: '2.90€' }
          ]
        },
        {
          icon: '🥤',
          name: 'Waters & Soft Drinks',
          dishes: [
            { name: 'Still Purified Water', desc: '', price: '1.80€' },
            { name: 'Sparkling Purified Water', desc: '', price: '2.10€' },
            { name: 'Pedras Natural Sparkling Water', desc: '', price: '2.50€' },
            { name: 'Flavoured Mineral Water', desc: '', price: '2.80€' },
            { name: 'Coca-Cola / Zero', desc: '', price: '3.10€' },
            { name: 'Fanta Orange', desc: '', price: '3.10€' },
            { name: 'Peach / Lemon Ice Tea', desc: '', price: '3.10€' },
            { name: 'Guaraná Antarctica', desc: '', price: '3.10€' },
            { name: 'Fresh Orange Juice', desc: '', price: '4.00€' },
            { name: 'Fresh Strawberry Juice', desc: '', price: '5.00€' },
            { name: 'Pineapple with Fresh Mint Juice', desc: '', price: '5.50€' }
          ]
        },
        {
          icon: '🍺',
          name: 'Beers & Ciders',
          dishes: [
            { name: 'Draught Beer 20cl (Imperial)', desc: '', price: '2.00€' },
            { name: 'Draught Beer 30cl (Tulipa)', desc: '', price: '3.00€' },
            { name: 'Draught Beer 50cl (Pint/Caneca)', desc: '', price: '4.50€' },
            { name: 'Dark Beer / Stout', desc: '', price: '3.00€' },
            { name: 'Non-Alcoholic Beer', desc: '', price: '3.00€' },
            { name: 'Apple Cider Tulipa (Bandida do Pomar)', desc: '', price: '4.50€' },
            { name: 'Apple Cider Pint (Bandida do Pomar)', desc: '', price: '6.50€' }
          ]
        },
        {
          icon: '🍹',
          name: 'Cocktails & Sangrias',
          dishes: [
            { name: 'Caipirinha', desc: '', price: '8.50€' },
            { name: 'Cuba Libre', desc: '', price: '8.00€' },
            { name: 'Aperol Spritz', desc: '', price: '9.50€' },
            { name: 'Limoncello Spritz', desc: '', price: '9.50€' },
            { name: 'Hugo Spritz', desc: '', price: '10.00€' },
            { name: 'Pisco Sour', desc: '', price: '10.00€' },
            { name: 'Sex on the Beach', desc: '', price: '10.50€' },
            { name: 'Dry Martini', desc: '', price: '12.00€' },
            { name: 'Espresso Martini', desc: '', price: '13.00€' },
            { name: 'Red Wine Sangria (1.50 L)', desc: '', price: '17.50€' },
            { name: 'White Wine Sangria (1.50 L)', desc: '', price: '17.50€' },
            { name: 'Sparkling Wine Sangria (1.50 L)', desc: '', price: '20.50€' }
          ]
        },
        {
          icon: '🍷',
          name: 'Wines & Sparkling',
          dishes: [
            { name: 'House Wine by the Glass (Red / White / Green / Rosé)', desc: '', price: '4.50€' },
            { name: 'Sparkling Wine / Sangria by the Glass', desc: '', price: '6.00€' },
            { name: 'House Red Wine (½ L: 7.50€ | 1L Jug: 13.50€)', desc: '', price: '7.50€ - 13.50€' },
            { name: 'Red Wine Quintela', desc: '', price: '16.50€' },
            { name: 'Red Wine Flor do Côa', desc: '', price: '18.50€' },
            { name: 'Red Wine Arrábida Merlot', desc: '', price: '20.00€' },
            { name: 'Red Wine Arrábida Cabernet Sauvignon', desc: '', price: '25.00€' },
            { name: 'House White Wine (½ L: 7.50€ | 1L Jug: 12.50€)', desc: '', price: '7.50€ - 12.50€' },
            { name: 'White Wine Quintela', desc: '', price: '15.50€' },
            { name: 'White Wine Flor do Côa', desc: '', price: '17.50€' },
            { name: 'White Wine Trinca Bolotas Chardonnay', desc: '', price: '18.50€' },
            { name: 'White Wine Arrábida Sauvignon Blanc', desc: '', price: '22.00€' },
            { name: 'Vinho Verde (½ L: 7.50€ | 1L Jug: 14.50€)', desc: '', price: '7.50€ - 14.50€' },
            { name: 'Vinho Verde Casal Garcia', desc: '', price: '15.50€' },
            { name: 'Vinho Verde Aveleda', desc: '', price: '17.50€' },
            { name: 'Vinho Verde Muralhas de Monção', desc: '', price: '19.00€' },
            { name: 'Vinho Verde Alvarinho', desc: '', price: '21.50€' },
            { name: 'Rosé Wine (Glass: 4.50€ | Quintela: 14.00€ | Flor do Côa: 16.00€ | Mateus: 18.00€)', desc: '', price: '4.50€ - 18.00€' },
            { name: 'Sparkling Wine (Glass: 6.50€ | Lambrusco: 17.00€ | Perlino: 18.00€ | Murganheira: 22.50€ | Raposeira: 26.50€)', desc: '', price: '6.50€ - 26.50€' }
          ]
        },
        {
          icon: '🥃',
          name: 'Digestifs & Spirits',
          dishes: [
            { name: 'Liqueurs (Ginja 3.50€ | Licor Beirão 3.00€ | Moscatel 4.50€ | Port Wine 5.00€ | Baileys 6.50€ | Limoncello 7.00€)', desc: '', price: '3.00€ - 7.00€' },
            { name: 'Portuguese Brandies (Bagaço 3.50€ | Aliança Velha 4.00€ | Vodka 5.50€ | Macieira 6.50€ | C.R.&F. 8.50€)', desc: '', price: '3.50€ - 8.50€' },
            { name: 'Standard Whiskies (J&B 5.00€ | Jameson 6.50€ | Jack Daniel\'s 7.00€)', desc: '', price: '5.00€ - 7.00€' },
            { name: 'Aged Whiskies (Cardhu 10.00€ | Ballantine\'s 11.50€ | Black Label 12.00€)', desc: '', price: '10.00€ - 12.00€' },
            { name: 'Gins (Gordon\'s 8.00€ | Tanqueray 9.50€ | Hendrick\'s 10.50€ | Bulldog 12.50€)', desc: '', price: '8.00€ - 12.50€' }
          ]
        }
      ]
    },

    fr: {
      title: 'Menu Officiel · Solar do Loureiro',
      notice: '✨ Cuisine Traditionnelle Portugaise · Préparée chaque jour avec des produits frais.',
      detectedText: 'Langue du téléphone détectée: Français',
      instagramCta: 'Suivre Nos Nouveautés sur Instagram',
      categories: [
        {
          icon: '🥖',
          name: 'Couvert',
          dishes: [
            { name: 'Couvert Complet', desc: 'Pain, rillettes de morue, beurre et olives marinées', price: '7.00€' },
            { name: 'Panier de Pain', desc: '', price: '2.10€' },
            { name: 'Beurre', desc: '', price: '1.00€' },
            { name: 'Olives Assaisonnées', desc: '', price: '1.50€' },
            { name: 'Rillettes de Morue', desc: '', price: '3.50€' },
            { name: 'Fromage', desc: '', price: '4.50€' },
            { name: 'Jambon Ibérique Affiné', desc: '', price: '12.00€' },
            { name: 'Croquettes de Viande (2 pcs)', desc: '', price: '4.00€' }
          ]
        },
        {
          icon: '🧆',
          name: 'Entrées',
          dishes: [
            { name: 'Caldo Verde', desc: 'Soupe traditionnelle au chou vert émincé', price: '4.50€' },
            { name: 'Soupe de Poisson', desc: '', price: '6.50€' },
            { name: 'Beignets de Morue (2 pcs)', desc: '', price: '4.00€' },
            { name: 'Huîtres Fraîches (4 pcs)', desc: '', price: '9.50€' },
            { name: 'Huîtres Fraîches (10 pcs)', desc: '', price: '23.50€' },
            { name: 'Crevettes à l’Ail', desc: 'Crevettes décortiquées, huile d’olive, ail et vin blanc', price: '13.50€' },
            { name: 'Palourdes à la Bulhão Pato', desc: 'Palourdes sautées à l’ail, coriandre, vin blanc et beurre', price: '12.00€' },
            { name: 'Chorizo Grillé au Feu', desc: '', price: '8.50€' },
            { name: 'Planche de Fromages', desc: 'Fromage sec, fromage da Serra, brie et olives', price: '10.50€' },
            { name: 'Planche Mixte Charcuterie & Fromages', desc: 'Mozzarella de bufflonne, fromage affiné, olives, jambon cru et paio', price: '12.50€' }
          ]
        },
        {
          icon: '🥗',
          name: 'Salades',
          dishes: [
            { name: 'Salade de Tomates', desc: 'Tomates fraîches tranchées, oignons et sel marin', price: '4.00€' },
            { name: 'Salade Mixte', desc: 'Laitue, carotte, oignon, concombre et tomate', price: '4.50€' },
            { name: 'Salade de Poulpe', desc: 'Poulpe en morceaux, oignon, poivrons, huile d’olive et vinaigre', price: '9.50€' },
            { name: 'Salade de Morue', desc: 'Laitue, pois chiches, pommes de terre bouillies, oignons et olives', price: '11.50€' }
          ]
        },
        {
          icon: '🐟',
          name: 'Poissons',
          dishes: [
            { name: 'Pavé de Saumon', desc: 'Saumon rôti au four, pommes de terre écrasées et légumes sautés', price: '15.50€' },
            { name: 'Poulpe à la Lagareiro', desc: 'Poulpe sauté à l’ail et huile d’olive, pommes tapées et légumes', price: '20.50€' },
            { name: 'Mérou Rôti au Four', desc: 'Pavé de mérou à l’ail et huile d’olive, pommes écrasées et légumes', price: '21.00€' },
            { name: 'Turbot Rôti au Four', desc: 'Pavé de turbot à l’ail et huile d’olive, pommes écrasées et légumes', price: '22.00€' }
          ]
        },
        {
          icon: '🥘',
          name: 'Morue (Bacalhau)',
          dishes: [
            { name: 'Bacalhau à Brás', desc: 'Effiloché de morue, pommes paille, œufs battus, oignons, olives et coriandre', price: '15.00€' },
            { name: 'Bacalhau com Natas', desc: 'Gratin de morue crémeux à la crème fraîche, pommes de terre et mozzarella', price: '15.00€' },
            { name: 'Crevettes Gratinées à la Crème', desc: 'Crevettes coupées, pommes de terre en dés, crème fraîche et mozzarella', price: '16.00€' },
            { name: 'Bacalhau à Gomes de Sá', desc: 'Morue effilochée, oignons, œuf dur, pommes vapeur, poivre noir, olives et coriandre', price: '16.50€' },
            { name: 'Bacalhau Espiritual', desc: 'Morue gratinée au pain, lait, carotte, sauce béchamel crémeuse et fromage râpé', price: '17.00€' },
            { name: 'Bacalhau na Telha', desc: 'Pavé de morue grillé sur tuile d’argile, ail, huile d’olive et légumes', price: '18.50€' }
          ]
        },
        {
          icon: '🍲',
          name: 'Plats Mijotés & Riz (No Tacho)',
          dishes: [
            { name: 'Riz de Canard au Four', desc: 'Canard effiloché, chouriço de viande, lardons, carotte, porto et poivre noir', price: '15.50€' },
            { name: 'Riz aux Crevettes', desc: 'Crevettes fraîches, oignons, poivrons, sauce tomate, algues et coriandre', price: '1p: 16.50€ | 2p: 31.00€' },
            { name: 'Riz aux Couteaux de Mer', desc: 'Couteaux de mer, ail, sauce tomate, poivrons, vin blanc, girofle et coriandre', price: '1p: 17.50€ | 2p: 33.00€' },
            { name: 'Riz au Poulpe Fondant', desc: 'Poulpe en morceaux, poivrons, sauce tomate riche, algues et coriandre', price: '1p: 19.50€ | 2p: 35.50€' },
            { name: 'Riz aux Fruits de Mer', desc: 'Gambas tigres, crevettes, moules, palourdes, calmars, sauce tomate et coriandre', price: '1p: 21.50€ | 2p: 41.00€' },
            { name: 'Cataplana de Fruits de Mer', desc: 'Homard, crevettes, moules, palourdes, calmars, algues, tomates et pommes de terre', price: '1p: 25.00€ | 2p: 48.00€' }
          ]
        },
        {
          icon: '🥩',
          name: 'Viandes',
          dishes: [
            { name: 'Blanc de Poulet Sauté', desc: 'Filet de poulet sauté, pommes écrasées au four et légumes', price: '13.50€' },
            { name: 'Poulet Piri-Piri Grillé', desc: 'Cuisse de poulet rôtie épicée, pommes tapées et légumes', price: '14.50€' },
            { name: 'Escalope de Porc au Vin de Madère', desc: 'Émincé de porc au vin de Madère, jambon cru, pommes écrasées et légumes', price: '14.00€' },
            { name: 'Porc à l’Alentejana aux Palourdes', desc: 'Dés de porc marinés au vin blanc, palourdes fraîches, frites en dés et pickles', price: '16.00€' },
            { name: 'Faux-Filet de Bœuf (300g)', desc: 'Steak de faux-filet sauté, pommes de terre écrasées et légumes de saison', price: '18.50€' },
            { name: 'Picanha sur Pierre Chaude', desc: 'Picanha tranchée, riz blanc, pommes écrasées, haricots noirs et légumes', price: '65.00€ / kg' }
          ]
        },
        {
          icon: '🍝',
          name: 'Pâtes',
          dishes: [
            { name: 'Spaghetti Carbonara', desc: 'Lardons dorés, jaune d’œuf et parmesan', price: '11.50€' },
            { name: 'Spaghetti Bolognaise', desc: 'Bœuf haché mijoté, sauce tomate, parmesan et basilic frais', price: '12.50€' },
            { name: 'Spaghetti aux Crevettes', desc: 'Crevettes décortiquées, sauce tomate, parmesan et basilic', price: '13.50€' },
            { name: 'Spaghetti Pescatori', desc: 'Crevettes, moules, palourdes, sauce tomate, parmesan et basilic', price: '14.50€' }
          ]
        },
        {
          icon: '🥔',
          name: 'Accompagnements',
          dishes: [
            { name: 'Pommes Écrasées (Batata a Murro)', desc: '', price: '3.50€' },
            { name: 'Riz Blanc', desc: '', price: '3.50€' },
            { name: 'Haricots Noirs', desc: '', price: '3.50€' },
            { name: 'Œuf au Plat', desc: '', price: '3.50€' },
            { name: 'Légumes Sautés', desc: '', price: '3.50€' }
          ]
        },
        {
          icon: '🍮',
          name: 'Desserts',
          dishes: [
            { name: 'Baba de Camelo', desc: 'Mousse fondante au caramel et lait concentré cuit', price: '4.00€' },
            { name: 'Leite-Creme', desc: 'Crème brûlée traditionnelle caramélisée au fer', price: '4.00€' },
            { name: 'Arroz-Doce', desc: 'Riz au lait portugais parfumé à la cannelle', price: '4.00€' },
            { name: 'Mousse au Chocolat', desc: 'Mousse artisanale au chocolat noir', price: '4.00€' }
          ]
        },
        {
          icon: '☕',
          name: 'Cafés & Thés',
          dishes: [
            { name: 'Expresso (Bica)', desc: '', price: '1.20€' },
            { name: 'Café Noisette (Pingado)', desc: '', price: '1.50€' },
            { name: 'Café Américain (Allongé)', desc: '', price: '1.90€' },
            { name: 'Café au Lait (Meia de Leite)', desc: '', price: '2.10€' },
            { name: 'Double Expresso', desc: '', price: '2.50€' },
            { name: 'Décaféiné', desc: '', price: '1.80€' },
            { name: 'Double Décaféiné', desc: '', price: '3.00€' },
            { name: 'Cappuccino', desc: '', price: '3.50€' },
            { name: 'Thé / Infusion', desc: '', price: '2.90€' }
          ]
        },
        {
          icon: '🥤',
          name: 'Eaux & Sodas',
          dishes: [
            { name: 'Eau Plate Purifiée', desc: '', price: '1.80€' },
            { name: 'Eau Gazeuse Purifiée', desc: '', price: '2.10€' },
            { name: 'Eau Minérale Gazeuse Pedras', desc: '', price: '2.50€' },
            { name: 'Eau Aromatisée', desc: '', price: '2.80€' },
            { name: 'Coca-Cola / Zero', desc: '', price: '3.10€' },
            { name: 'Fanta Orange', desc: '', price: '3.10€' },
            { name: 'Ice Tea Pêche / Citron', desc: '', price: '3.10€' },
            { name: 'Guaraná Antarctica', desc: '', price: '3.10€' },
            { name: 'Jus d’Orange Frais Pressé', desc: '', price: '4.00€' },
            { name: 'Jus de Fraise Frais', desc: '', price: '5.00€' },
            { name: 'Ananas & Menthe Fraîche', desc: '', price: '5.50€' }
          ]
        },
        {
          icon: '🍺',
          name: 'Bières & Cidres',
          dishes: [
            { name: 'Pression 20cl (Imperial)', desc: '', price: '2.00€' },
            { name: 'Pression 30cl (Tulipa)', desc: '', price: '3.00€' },
            { name: 'Chope 50cl (Caneca)', desc: '', price: '4.50€' },
            { name: 'Bière Brune / Noire', desc: '', price: '3.00€' },
            { name: 'Bière Sans Alcool', desc: '', price: '3.00€' },
            { name: 'Cidre de Pomme Tulipa (Bandida)', desc: '', price: '4.50€' },
            { name: 'Cidre de Pomme Pinte (Bandida)', desc: '', price: '6.50€' }
          ]
        },
        {
          icon: '🍹',
          name: 'Cocktails & Sangrias',
          dishes: [
            { name: 'Caipirinha', desc: '', price: '8.50€' },
            { name: 'Cuba Libre', desc: '', price: '8.00€' },
            { name: 'Aperol Spritz', desc: '', price: '9.50€' },
            { name: 'Limoncello Spritz', desc: '', price: '9.50€' },
            { name: 'Hugo Spritz', desc: '', price: '10.00€' },
            { name: 'Pisco Sour', desc: '', price: '10.00€' },
            { name: 'Sex on the Beach', desc: '', price: '10.50€' },
            { name: 'Dry Martini', desc: '', price: '12.00€' },
            { name: 'Espresso Martini', desc: '', price: '13.00€' },
            { name: 'Sangria Vin Rouge (1.50 L)', desc: '', price: '17.50€' },
            { name: 'Sangria Vin Blanc (1.50 L)', desc: '', price: '17.50€' },
            { name: 'Sangria Vin Pétillant (1.50 L)', desc: '', price: '20.50€' }
          ]
        },
        {
          icon: '🍷',
          name: 'Vins & Mousseux',
          dishes: [
            { name: 'Vin de la Maison au Verre (Rouge / Blanc / Vert / Rosé)', desc: '', price: '4.50€' },
            { name: 'Vin Pétillant / Sangria au Verre', desc: '', price: '6.00€' },
            { name: 'Vin Rouge Maison (½ L: 7.50€ | Pichet 1L: 13.50€)', desc: '', price: '7.50€ - 13.50€' },
            { name: 'Vin Rouge Quintela', desc: '', price: '16.50€' },
            { name: 'Vin Rouge Flor do Côa', desc: '', price: '18.50€' },
            { name: 'Vin Rouge Arrábida Merlot', desc: '', price: '20.00€' },
            { name: 'Vin Rouge Arrábida Cabernet Sauvignon', desc: '', price: '25.00€' },
            { name: 'Vin Blanc Maison (½ L: 7.50€ | Pichet 1L: 12.50€)', desc: '', price: '7.50€ - 12.50€' },
            { name: 'Vin Blanc Quintela', desc: '', price: '15.50€' },
            { name: 'Vin Blanc Flor do Côa', desc: '', price: '17.50€' },
            { name: 'Vin Blanc Trinca Bolotas Chardonnay', desc: '', price: '18.50€' },
            { name: 'Vin Blanc Arrábida Sauvignon Blanc', desc: '', price: '22.00€' },
            { name: 'Vinho Verde (½ L: 7.50€ | Pichet 1L: 14.50€)', desc: '', price: '7.50€ - 14.50€' },
            { name: 'Vinho Verde Casal Garcia', desc: '', price: '15.50€' },
            { name: 'Vinho Verde Aveleda', desc: '', price: '17.50€' },
            { name: 'Vinho Verde Muralhas de Monção', desc: '', price: '19.00€' },
            { name: 'Vinho Verde Alvarinho', desc: '', price: '21.50€' },
            { name: 'Vin Rosé (Verre: 4.50€ | Quintela: 14.00€ | Flor do Côa: 16.00€ | Mateus: 18.00€)', desc: '', price: '4.50€ - 18.00€' },
            { name: 'Vin Pétillant (Verre: 6.50€ | Lambrusco: 17.00€ | Perlino: 18.00€ | Murganheira: 22.50€ | Raposeira: 26.50€)', desc: '', price: '6.50€ - 26.50€' }
          ]
        },
        {
          icon: '🥃',
          name: 'Digestifs & Liqueurs',
          dishes: [
            { name: 'Liqueurs (Ginja 3.50€ | Licor Beirão 3.00€ | Moscatel 4.50€ | Vin de Porto 5.00€ | Baileys 6.50€ | Limoncello 7.00€)', desc: '', price: '3.00€ - 7.00€' },
            { name: 'Eaux-de-vie (Bagaço 3.50€ | Aliança Velha 4.00€ | Vodka 5.50€ | Macieira 6.50€ | C.R.&F. 8.50€)', desc: '', price: '3.50€ - 8.50€' },
            { name: 'Whisky Jeune (J&B 5.00€ | Jameson 6.50€ | Jack Daniel\'s 7.00€)', desc: '', price: '5.00€ - 7.00€' },
            { name: 'Whisky Âgé (Cardhu 10.00€ | Ballantine\'s 11.50€ | Black Label 12.00€)', desc: '', price: '10.00€ - 12.00€' },
            { name: 'Gin (Gordon\'s 8.00€ | Tanqueray 9.50€ | Hendrick\'s 10.50€ | Bulldog 12.50€)', desc: '', price: '8.00€ - 12.50€' }
          ]
        }
      ]
    },

    es: {
      title: 'Menú Oficial · Solar do Loureiro',
      notice: '✨ Cocina Tradicional Portuguesa · Elaboración diaria con ingredientes frescos.',
      detectedText: 'Idioma del teléfono detectado: Español',
      instagramCta: 'Seguir Novedades en Instagram',
      categories: [
        {
          icon: '🥖',
          name: 'Couvert',
          dishes: [
            { name: 'Couvert Completo', desc: 'Pan, paté de bacalao, mantequilla y aceitunas aliñadas', price: '7.00€' },
            { name: 'Cesta de Pan', desc: '', price: '2.10€' },
            { name: 'Mantequilla', desc: '', price: '1.00€' },
            { name: 'Aceitunas Aliñadas', desc: '', price: '1.50€' },
            { name: 'Paté de Bacalao', desc: '', price: '3.50€' },
            { name: 'Queso', desc: '', price: '4.50€' },
            { name: 'Jamón Ibérico', desc: '', price: '12.00€' },
            { name: 'Croquetas de Carne (2 uds)', desc: '', price: '4.00€' }
          ]
        },
        {
          icon: '🧆',
          name: 'Entrantes',
          dishes: [
            { name: 'Caldo Verde', desc: 'Sopa tradicional de patata y col rizada en juliana', price: '4.50€' },
            { name: 'Sopa de Pescado', desc: '', price: '6.50€' },
            { name: 'Pastel de Bacalao (2 uds)', desc: '', price: '4.00€' },
            { name: 'Ostras Frescas (4 uds)', desc: '', price: '9.50€' },
            { name: 'Ostras Frescas (10 uds)', desc: '', price: '23.50€' },
            { name: 'Gambas al Ajillo', desc: 'Gambas peladas, aceite de oliva virgen, ajo y vino blanco', price: '13.50€' },
            { name: 'Almejas a la Bulhão Pato', desc: 'Almejas con ajo, cilantro fresco, vino blanco y mantequilla', price: '12.00€' },
            { name: 'Chorizo Asado a la Brasa', desc: '', price: '8.50€' },
            { name: 'Tabla de Quesos', desc: 'Queso curado, queso da Serra, queso brie y aceitunas', price: '10.50€' },
            { name: 'Tabla Mixta', desc: 'Mozzarella de búfala, queso curado, aceitunas, jamón ibérico y lomo', price: '12.50€' }
          ]
        },
        {
          icon: '🥗',
          name: 'Ensaladas',
          dishes: [
            { name: 'Ensalada de Tomate', desc: 'Tomate en rodajas, cebolla y sal marina', price: '4.00€' },
            { name: 'Ensalada Mixta', desc: 'Lechuga, zanahoria, cebolla, pepino y tomate', price: '4.50€' },
            { name: 'Ensalada de Pulpo', desc: 'Cebolla, pimientos, aceite de oliva, vinagre y pulpo laminado', price: '9.50€' },
            { name: 'Ensalada de Bacalao', desc: 'Lechuga, garbanzos, patata cocida, cebolla y aceitunas', price: '11.50€' }
          ]
        },
        {
          icon: '🐟',
          name: 'Pescados',
          dishes: [
            { name: 'Salmón al Horno', desc: 'Lomo de salmón al horno con patatas al puño y verduras salteadas', price: '15.50€' },
            { name: 'Pulpo a la Lagareiro', desc: 'Pulpo salteado con ajo en aceite de oliva, patatas al puño y verduras', price: '20.50€' },
            { name: 'Lomo de Mero al Horno', desc: 'Mero al horno, ajo en aceite de oliva, patatas al puño y verduras', price: '21.00€' },
            { name: 'Lomo de Rodaballo al Horno', desc: 'Rodaballo al horno con aceite de ajo, patatas al puño y verduras', price: '22.00€' }
          ]
        },
        {
          icon: '🥘',
          name: 'Bacalao (Bacalhau)',
          dishes: [
            { name: 'Bacalhau à Brás', desc: 'Bacalao desmigado, patatas paja finas, huevo cremoso, cebolla, aceitunas y cilantro', price: '15.00€' },
            { name: 'Bacalhau com Natas', desc: 'Bacalao desmigado al horno con dados de patata, nata y queso mozzarella', price: '15.00€' },
            { name: 'Gambas con Nata Gratinadas', desc: 'Gambas en dados, patatas en dados, nata suave y queso mozzarella', price: '16.00€' },
            { name: 'Bacalhau à Gomes de Sá', desc: 'Bacalao desmigado, cebolla, huevo duro, patata cocida, pimienta negra, aceitunas y cilantro', price: '16.50€' },
            { name: 'Bacalhau Espiritual', desc: 'Bacalao gratinado con pan, leche, cebolla, ajo, zanahoria, bechamel, nata y queso rallado', price: '17.00€' },
            { name: 'Bacalhau na Telha', desc: 'Lomo de bacalao a la brasa sobre teja, ajo en aceite de oliva, patatas al puño y verduras', price: '18.50€' }
          ]
        },
        {
          icon: '🍲',
          name: 'Platos de Cazuela y Arroces (No Tacho)',
          dishes: [
            { name: 'Arroz de Pato al Horno', desc: 'Pato desmigado, chorizo, beicon, cebolla, zanahoria, laurel, vino de Oporto y pimienta negra', price: '15.50€' },
            { name: 'Arroz Caldoso de Gambas', desc: 'Gambas peladas, cebolla, pimientos, salsa de tomate rica, algas marinas y cilantro', price: '1p: 16.50€ | 2p: 31.00€' },
            { name: 'Arroz de Navajas (Lingueirão)', desc: 'Navajas frescas, cebolla, ajo, salsa de tomate, pimientos, vino blanco, clavo y cilantro', price: '1p: 17.50€ | 2p: 33.00€' },
            { name: 'Arroz Caldoso de Pulpo', desc: 'Pulpo troceado, cebolla, pimientos, salsa de tomate, algas marinas y cilantro', price: '1p: 19.50€ | 2p: 35.50€' },
            { name: 'Arroz de Marisco', desc: 'Langostinos tigre, gambas, mejillones, almejas, calamares, salsa de tomate, algas y cilantro', price: '1p: 21.50€ | 2p: 41.00€' },
            { name: 'Cataplana de Mariscos', desc: 'Bogavante, gambas, mejillones, almejas, calamares, algas, tomate, cilantro y patata', price: '1p: 25.00€ | 2p: 48.00€' }
          ]
        },
        {
          icon: '🥩',
          name: 'Carnes',
          dishes: [
            { name: 'Pechuga de Pollo Salteada', desc: 'Pechuga salteada con patatas al puño y verduras frescas', price: '13.50€' },
            { name: 'Pollo Asado al Piri-Piri', desc: 'Muslo de pollo asado picante con patatas al puño y verduras', price: '14.50€' },
            { name: 'Escalope de Cerdo a la Salsa Madeira', desc: 'Lomo de cerdo en salsa al vino de Madeira, jamón, patatas al puño y verduras', price: '14.00€' },
            { name: 'Carne de Cerdo a la Alentejana', desc: 'Dados de lomo marinados en vino blanco, almejas frescas, patatas fritas en dados y encurtidos', price: '16.00€' },
            { name: 'Entrecot de Ternera (Bife da Vazia 300g)', desc: '300g de solomillo bajo de ternera salteado con patatas al puño y verduras', price: '18.50€' },
            { name: 'Picanha a la Piedra Caliente', desc: 'Picanha laminada, arroz blanco, patatas al puño, frijoles negros y verduras', price: '65.00€ / kg' }
          ]
        },
        {
          icon: '🍝',
          name: 'Pastas',
          dishes: [
            { name: 'Espaguetis a la Carbonara', desc: 'Beicon dorado, huevo y queso parmesano', price: '11.50€' },
            { name: 'Espaguetis a la Boloñesa', desc: 'Carne picada de ternera, salsa de tomate, queso parmesano y albahaca fresca', price: '12.50€' },
            { name: 'Espaguetis con Gambas', desc: 'Gambas peladas, rica salsa de tomate, queso parmesano y albahaca', price: '13.50€' },
            { name: 'Espaguetis Marineros Pescatori', desc: 'Gambas, mejillones, almejas, salsa de tomate, queso parmesano y albahaca', price: '14.50€' }
          ]
        },
        {
          icon: '🥔',
          name: 'Guarniciones',
          dishes: [
            { name: 'Patatas al Puño (Batata a Murro)', desc: '', price: '3.50€' },
            { name: 'Arroz Blanco', desc: '', price: '3.50€' },
            { name: 'Frijoles Negros', desc: '', price: '3.50€' },
            { name: 'Huevo Frito', desc: '', price: '3.50€' },
            { name: 'Verduras Salteadas', desc: '', price: '3.50€' }
          ]
        },
        {
          icon: '🍮',
          name: 'Postres',
          dishes: [
            { name: 'Baba de Camelo', desc: 'Mousse tradicional cremosa de dulce de leche cocido', price: '4.00€' },
            { name: 'Leite-Creme', desc: 'Crema quemada tradicional con costra de azúcar al fuego', price: '4.00€' },
            { name: 'Arroz con Leche (Arroz-Doce)', desc: 'Arroz con leche cremoso con canela en polvo', price: '4.00€' },
            { name: 'Mousse de Chocolate', desc: 'Mousse artesanal de chocolate negro', price: '4.00€' }
          ]
        },
        {
          icon: '☕',
          name: 'Cafetería',
          dishes: [
            { name: 'Café Espresso (Bica)', desc: '', price: '1.20€' },
            { name: 'Café Cortado (Pingado)', desc: '', price: '1.50€' },
            { name: 'Café Americano', desc: '', price: '1.90€' },
            { name: 'Café con Leche (Meia de Leite)', desc: '', price: '2.10€' },
            { name: 'Café Doble', desc: '', price: '2.50€' },
            { name: 'Descafeinado', desc: '', price: '1.80€' },
            { name: 'Descafeinado Doble', desc: '', price: '3.00€' },
            { name: 'Capuchino', desc: '', price: '3.50€' },
            { name: 'Té / Infusiones', desc: '', price: '2.90€' }
          ]
        },
        {
          icon: '🥤',
          name: 'Aguas y Refrescos',
          dishes: [
            { name: 'Agua Purificada sin Gas', desc: '', price: '1.80€' },
            { name: 'Agua Purificada con Gas', desc: '', price: '2.10€' },
            { name: 'Agua con Gas Natural Pedras', desc: '', price: '2.50€' },
            { name: 'Agua Aromatizada', desc: '', price: '2.80€' },
            { name: 'Coca-Cola / Zero', desc: '', price: '3.10€' },
            { name: 'Fanta Naranja', desc: '', price: '3.10€' },
            { name: 'Nestea Melocotón / Limón', desc: '', price: '3.10€' },
            { name: 'Guaraná Antarctica', desc: '', price: '3.10€' },
            { name: 'Zumo de Naranja Natural Exprimido', desc: '', price: '4.00€' },
            { name: 'Zumo de Fresa Natural', desc: '', price: '5.00€' },
            { name: 'Zumo de Piña con Menta Fresca', desc: '', price: '5.50€' }
          ]
        },
        {
          icon: '🍺',
          name: 'Cervezas y Sidras',
          dishes: [
            { name: 'Caña 20cl (Imperial)', desc: '', price: '2.00€' },
            { name: 'Cerveza 30cl (Tulipa)', desc: '', price: '3.00€' },
            { name: 'Jarra de Cerveza 50cl (Caneca)', desc: '', price: '4.50€' },
            { name: 'Cerveza Negra', desc: '', price: '3.00€' },
            { name: 'Cerveza Sin Alcohol', desc: '', price: '3.00€' },
            { name: 'Sidra de Manzana Tulipa (Bandida)', desc: '', price: '4.50€' },
            { name: 'Sidra de Manzana Pinta (Bandida)', desc: '', price: '6.50€' }
          ]
        },
        {
          icon: '🍹',
          name: 'Cócteles y Sangrías',
          dishes: [
            { name: 'Caipiriña', desc: '', price: '8.50€' },
            { name: 'Cuba Libre', desc: '', price: '8.00€' },
            { name: 'Aperol Spritz', desc: '', price: '9.50€' },
            { name: 'Limoncello Spritz', desc: '', price: '9.50€' },
            { name: 'Hugo Spritz', desc: '', price: '10.00€' },
            { name: 'Pisco Sour', desc: '', price: '10.00€' },
            { name: 'Sex on the Beach', desc: '', price: '10.50€' },
            { name: 'Dry Martini', desc: '', price: '12.00€' },
            { name: 'Espresso Martini', desc: '', price: '13.00€' },
            { name: 'Sangría Tinta (1.50 L)', desc: '', price: '17.50€' },
            { name: 'Sangría Blanca (1.50 L)', desc: '', price: '17.50€' },
            { name: 'Sangría Espumosa (1.50 L)', desc: '', price: '20.50€' }
          ]
        },
        {
          icon: '🍷',
          name: 'Vinos y Espumosos',
          dishes: [
            { name: 'Vino de la Casa por Copa (Tinto / Blanco / Verde / Rosado)', desc: '', price: '4.50€' },
            { name: 'Copa de Espumoso / Sangría', desc: '', price: '6.00€' },
            { name: 'Vino Tinto de la Casa (½ L: 7.50€ | Jarra 1L: 13.50€)', desc: '', price: '7.50€ - 13.50€' },
            { name: 'Vino Tinto Quintela', desc: '', price: '16.50€' },
            { name: 'Vino Tinto Flor do Côa', desc: '', price: '18.50€' },
            { name: 'Vino Tinto Arrábida Merlot', desc: '', price: '20.00€' },
            { name: 'Vino Tinto Arrábida Cabernet Sauvignon', desc: '', price: '25.00€' },
            { name: 'Vino Blanco de la Casa (½ L: 7.50€ | Jarra 1L: 12.50€)', desc: '', price: '7.50€ - 12.50€' },
            { name: 'Vino Blanco Quintela', desc: '', price: '15.50€' },
            { name: 'Vino Blanco Flor do Côa', desc: '', price: '17.50€' },
            { name: 'Vino Blanco Trinca Bolotas Chardonnay', desc: '', price: '18.50€' },
            { name: 'Vino Blanco Arrábida Sauvignon Blanc', desc: '', price: '22.00€' },
            { name: 'Vino Verde (½ L: 7.50€ | Jarra 1L: 14.50€)', desc: '', price: '7.50€ - 14.50€' },
            { name: 'Vino Verde Casal Garcia', desc: '', price: '15.50€' },
            { name: 'Vino Verde Aveleda', desc: '', price: '17.50€' },
            { name: 'Vino Verde Muralhas de Monção', desc: '', price: '19.00€' },
            { name: 'Vino Verde Alvarinho', desc: '', price: '21.50€' },
            { name: 'Vino Rosado (Copa: 4.50€ | Quintela: 14.00€ | Flor do Côa: 16.00€ | Mateus: 18.00€)', desc: '', price: '4.50€ - 18.00€' },
            { name: 'Espumoso (Copa: 6.50€ | Lambrusco: 17.00€ | Perlino: 18.00€ | Murganheira: 22.50€ | Raposeira: 26.50€)', desc: '', price: '6.50€ - 26.50€' }
          ]
        },
        {
          icon: '🥃',
          name: 'Digestivos y Licores',
          dishes: [
            { name: 'Licores (Ginja 3.50€ | Licor Beirão 3.00€ | Moscatel 4.50€ | Vino de Oporto 5.00€ | Baileys 6.50€ | Limoncello 7.00€)', desc: '', price: '3.00€ - 7.00€' },
            { name: 'Aguardientes (Bagaço 3.50€ | Aliança Velha 4.00€ | Vodka 5.50€ | Macieira 6.50€ | C.R.&F. 8.50€)', desc: '', price: '3.50€ - 8.50€' },
            { name: 'Whisky Joven (J&B 5.00€ | Jameson 6.50€ | Jack Daniel\'s 7.00€)', desc: '', price: '5.00€ - 7.00€' },
            { name: 'Whisky Añejo (Cardhu 10.00€ | Ballantine\'s 11.50€ | Black Label 12.00€)', desc: '', price: '10.00€ - 12.00€' },
            { name: 'Ginebras (Gordon\'s 8.00€ | Tanqueray 9.50€ | Hendrick\'s 10.50€ | Bulldog 12.50€)', desc: '', price: '8.00€ - 12.50€' }
          ]
        }
      ]
    }
  };

  // Deteção inteligente do idioma do telemóvel do cliente
  function detectSmartphoneLanguage() {
    const navLangs = navigator.languages || [navigator.language || 'pt'];
    for (const l of navLangs) {
      if (!l) continue;
      const clean = l.toLowerCase();
      if (clean.startsWith('fr')) return 'fr';
      if (clean.startsWith('en')) return 'en';
      if (clean.startsWith('es')) return 'es';
      if (clean.startsWith('pt')) return 'pt';
    }
    return 'pt'; // Português por defeito
  }

  let currentEmentaLang = localStorage.getItem('solar_ementa_lang') || detectSmartphoneLanguage();

  function renderEmenta(lang, isAutoDetected = false) {
    const data = EMENTA_DATA[lang] || EMENTA_DATA.pt;
    currentEmentaLang = lang;

    if (ementaModalTitle) {
      ementaModalTitle.textContent = data.title;
    }

    if (ementaNoticeBadge) {
      ementaNoticeBadge.innerHTML = `<span>${data.notice}</span>`;
    }

    if (langDetectedText) {
      langDetectedText.textContent = data.detectedText;
    }

    if (ementaInstagramCta) {
      ementaInstagramCta.textContent = data.instagramCta;
    }

    langButtons.forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      const isActive = btnLang === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    if (ementaCategoriesContainer) {
      ementaCategoriesContainer.innerHTML = '';
      ementaCategoriesContainer.classList.remove('ementa-fade-transition');
      void ementaCategoriesContainer.offsetWidth;
      ementaCategoriesContainer.classList.add('ementa-fade-transition');

      data.categories.forEach(cat => {
        const catCard = document.createElement('div');
        catCard.className = 'ementa-category';

        let dishesHtml = '';
        cat.dishes.forEach(dish => {
          dishesHtml += `
            <div class="ementa-dish">
              <div class="dish-header">
                <span class="dish-name">${dish.name}</span>
                ${dish.price ? `<span class="dish-price">${dish.price}</span>` : ''}
              </div>
              ${dish.desc ? `<p class="dish-desc">${dish.desc}</p>` : ''}
            </div>
          `;
        });

        catCard.innerHTML = `
          <h4 class="ementa-cat-title">
            <span class="ementa-cat-icon" aria-hidden="true">${cat.icon}</span>
            <span>${cat.name}</span>
          </h4>
          <div class="ementa-dishes-list">
            ${dishesHtml}
          </div>
        `;

        ementaCategoriesContainer.appendChild(catCard);
      });
    }
  }

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const chosenLang = btn.getAttribute('data-lang');
      if (chosenLang && EMENTA_DATA[chosenLang]) {
        localStorage.setItem('solar_ementa_lang', chosenLang);
        renderEmenta(chosenLang, false);
      }
    });
  });

  function openEmentaModal(e) {
    if (e) e.preventDefault();
    if (!ementaModal) return;

    if (!localStorage.getItem('solar_ementa_lang')) {
      currentEmentaLang = detectSmartphoneLanguage();
      renderEmenta(currentEmentaLang, true);
    } else {
      renderEmenta(currentEmentaLang, false);
    }

    ementaModal.classList.add('active');
    ementaModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeEmentaModal() {
    if (!ementaModal) return;
    ementaModal.classList.remove('active');
    ementaModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (btnVerEmenta) btnVerEmenta.addEventListener('click', openEmentaModal);
  if (closeEmentaBtn) closeEmentaBtn.addEventListener('click', closeEmentaModal);
  if (ementaModal) {
    ementaModal.addEventListener('click', (e) => {
      if (e.target === ementaModal) closeEmentaModal();
    });
  }

  renderEmenta(currentEmentaLang, true);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (shareModal && shareModal.classList.contains('active')) closeShareModal();
      if (ementaModal && ementaModal.classList.contains('active')) closeEmentaModal();
    }
  });

  // --------------------------------------------------------------------------
  // COPIAR LINK
  // --------------------------------------------------------------------------
  if (copyUrlBtn) {
    copyUrlBtn.addEventListener('click', () => {
      copyToClipboard(shareData.url);
    });
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        handleCopySuccess();
      }).catch(() => {
        fallbackCopyText(text);
      });
    } else {
      fallbackCopyText(text);
    }
  }

  function fallbackCopyText(text) {
    if (shareUrlInput) {
      shareUrlInput.select();
      shareUrlInput.setSelectionRange(0, 99999);
      try {
        document.execCommand('copy');
        handleCopySuccess();
      } catch (err) {
        showToast('Não foi possível copiar automaticamente.');
      }
    }
  }

  function handleCopySuccess() {
    if (copyUrlBtn && copyBtnText) {
      copyUrlBtn.classList.add('copied');
      copyBtnText.textContent = 'Copiado! ✓';
      setTimeout(() => {
        copyUrlBtn.classList.remove('copied');
        copyBtnText.textContent = 'Copiar';
      }, 2500);
    }
    showToast('Link copiado para a área de transferência! ✨');
  }

  let toastTimer = null;
  function showToast(message) {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = message;
    toast.classList.add('active');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('active');
    }, 3200);
  }

  // Partilha direta
  const shareViaWhatsapp = document.getElementById('shareViaWhatsapp');
  const shareViaTwitter = document.getElementById('shareViaTwitter');
  const shareViaTelegram = document.getElementById('shareViaTelegram');

  if (shareViaWhatsapp) {
    shareViaWhatsapp.addEventListener('click', () => {
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareData.text + ' ' + shareData.url)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  if (shareViaTwitter) {
    shareViaTwitter.addEventListener('click', () => {
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  if (shareViaTelegram) {
    shareViaTelegram.addEventListener('click', () => {
      const url = `https://t.me/share/url?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  // Ripple effect
  const pillButtons = document.querySelectorAll('.azulejo-card-btn, .share-btn-azulejo');
  pillButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 550);
    });
  });

  // QR Code generator
  function drawQRCode(canvas, data) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    ctx.clearRect(0, 0, size, size);

    ctx.fillStyle = '#FFFFFF';
    ctx.roundRect ? ctx.roundRect(0, 0, size, size, 12) : ctx.fillRect(0, 0, size, size);
    ctx.fill();

    const matrixSize = 25;
    const cellSize = (size - 24) / matrixSize;
    const offset = 12;

    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      hash = (hash << 5) - hash + data.charCodeAt(i);
      hash |= 0;
    }

    ctx.fillStyle = '#070C18';

    function drawEye(startX, startY) {
      ctx.fillRect(offset + startX * cellSize, offset + startY * cellSize, 7 * cellSize, 7 * cellSize);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(offset + (startX + 1) * cellSize, offset + (startY + 1) * cellSize, 5 * cellSize, 5 * cellSize);
      ctx.fillStyle = '#0077FF';
      ctx.fillRect(offset + (startX + 2) * cellSize, offset + (startY + 2) * cellSize, 3 * cellSize, 3 * cellSize);
      ctx.fillStyle = '#070C18';
    }

    drawEye(0, 0);
    drawEye(matrixSize - 7, 0);
    drawEye(0, matrixSize - 7);

    for (let r = 0; r < matrixSize; r++) {
      for (let c = 0; c < matrixSize; c++) {
        const inTopLeft = r < 8 && c < 8;
        const inTopRight = r < 8 && c >= matrixSize - 8;
        const inBottomLeft = r >= matrixSize - 8 && c < 8;
        if (inTopLeft || inTopRight || inBottomLeft) continue;

        if (r === 6 || c === 6) {
          if ((r + c) % 2 === 0) {
            ctx.fillStyle = '#070C18';
            ctx.fillRect(offset + c * cellSize, offset + r * cellSize, cellSize - 0.5, cellSize - 0.5);
          }
          continue;
        }

        const val = Math.sin(r * 13 + c * 29 + hash) * 10000;
        if ((val - Math.floor(val)) > 0.45) {
          ctx.fillStyle = '#0A1224';
          ctx.beginPath();
          ctx.arc(
            offset + c * cellSize + cellSize / 2,
            offset + r * cellSize + cellSize / 2,
            (cellSize / 2) * 0.9,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      }
    }

    ctx.fillStyle = '#0077FF';
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, cellSize * 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, cellSize * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }
});
