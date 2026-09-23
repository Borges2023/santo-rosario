import { MysteryGroup, MysteryType, RosaryStep } from '../types/rosary';

export type { MysteryType, MysteryGroup, RosaryStep };

export const PRAYERS = {
  signOfCross: {
    title: 'Pelo Sinal da Santa Cruz',
    text: 'Pelo sinal da Santa Cruz, livrai-nos, Deus, Nosso Senhor, dos nossos inimigos.\n\nEm nome do Pai, do Filho e do Espírito Santo. Amém.',
  },
  offering: {
    title: 'Oferecimento do Santo Terço',
    text: 'Divino Jesus, nós Vos oferecemos este terço que vamos rezar, meditando nos mistérios da vossa Redenção. Concedei-nos, por intercessão da Virgem Maria, Mãe de Deus e nossa Mãe, as virtudes que nos são necessárias para bem rezá-lo e a graça de ganharmos as indulgências anexas a esta santa devoção.',
  },
  creed: {
    title: 'Creio em Deus Pai (Credo)',
    text: 'Creio em Deus Pai Todo-Poderoso, Criador do céu e da terra; e em Jesus Cristo, seu único Filho, nosso Senhor; que foi concebido pelo poder do Espírito Santo; nasceu da Virgem Maria; padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus; está sentado à direita de Deus Pai Todo-Poderoso, donde há de vir a julgar os vivos e os mortos.\n\nCreio no Espírito Santo; na Santa Igreja Católica; na comunhão dos santos; na remissão dos pecados; na ressurreição da carne; na vida eterna. Amém.',
  },
  ourFather: {
    title: 'Pai Nosso',
    text: 'Pai Nosso que estais nos céus, santificado seja o vosso nome, venha a nós o vosso reino, seja feita a vossa vontade assim na terra como no céu.\n\nO pão nosso de cada dia nos dai hoje, perdoai-nos as nossas ofensas assim como nós perdoamos a quem nos tem ofendido, e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.',
  },
  hailMary: {
    title: 'Ave Maria',
    text: 'Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus.\n\nSanta Maria, Mãe de Deus, rogai por nós pecadores, agora e na hora da nossa morte. Amém.',
  },
  glory: {
    title: 'Glória ao Pai',
    text: 'Glória ao Pai, ao Filho e ao Espírito Santo.\n\nComo era no princípio, agora e sempre. Amém.',
  },
  fatimaPrayer: {
    title: 'Jaculatória de Fátima',
    text: 'Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o Céu e socorrei principalmente as que mais precisarem da vossa infinita misericórdia.',
  },
  salveRegina: {
    title: 'Salve Rainha',
    text: 'Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve!\nA vós bradamos, os degredados filhos de Eva.\nA vós suspiramos, gemendo e chorando neste vale de lágrimas.\nEia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei,\ne depois deste desterro mostrai-nos Jesus, bendito fruto do vosso ventre,\nó clemente, ó piedosa, ó doce sempre Virgem Maria.\n\nRogai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.',
  },
  thanksgiving: {
    title: 'Agradecimento Final',
    text: 'Infinitas graças vos damos, Soberana Rainha, pelos benefícios que todos os dias recebemos de vossas mãos maternais. Dignai-vos agora e para sempre tomar-nos debaixo do vosso poderoso amparo e para mais vos agradecer vos saudamos com uma Salve Rainha...',
  },
};

export const MYSTERY_GROUPS: Record<MysteryType, MysteryGroup> = {
  gozosos: {
    id: 'gozosos',
    name: 'Mistérios Gozosos',
    subtitle: 'A Alegria da Encarnação e Infância de Jesus',
    daysOfWeek: 'Segundas-feiras e Sábados',
    daysOfWeekNumbers: [1, 6], // Monday and Saturday
    mysteries: [
      {
        number: 1,
        title: 'A Anunciação do Anjo Gabriel à Santíssima Virgem',
        biblicalReference: 'Lc 1, 26-38',
        fruitOfTheMystery: 'Virtude da Humildade',
        meditation: 'O Arcanjo Gabriel anuncia à Virgem Maria que Ela conceberá e dará à luz o Salvador. Maria responde com total fidelidade: "Eis aqui a serva do Senhor; faça-se em mim segundo a tua palavra".',
      },
      {
        number: 2,
        title: 'A Visitação de Nossa Senhora a Santa Isabel',
        biblicalReference: 'Lc 1, 39-56',
        fruitOfTheMystery: 'Amor ao Próximo e Caridade Fraterna',
        meditation: 'Maria põe-se a caminho apressadamente para as montanhas para servir sua prima Isabel, que exclama: "Bendita és tu entre as mulheres e bendito é o fruto do teu ventre".',
      },
      {
        number: 3,
        title: 'O Nascimento de Jesus na Gruta de Belém',
        biblicalReference: 'Lc 2, 1-20',
        fruitOfTheMystery: 'Desprendimento dos bens terrenos e Pobreza de Espírito',
        meditation: 'Em extrema pobreza e humildade, nasce o Redentor do mundo e é deitado numa manjedoura entre pastores e anjos que cantam a glória de Deus nas alturas.',
      },
      {
        number: 4,
        title: 'A Apresentação do Menino Jesus no Templo',
        biblicalReference: 'Lc 2, 22-38',
        fruitOfTheMystery: 'Obediência e Pureza de Coração',
        meditation: 'Maria e José apresentam o Divino Infante ao Senhor em obediência à Lei. O ancião Simeão profetiza que uma espada de dor traspassará a alma de Maria.',
      },
      {
        number: 5,
        title: 'A Perda e o Encontro do Menino Jesus no Templo',
        biblicalReference: 'Lc 2, 41-52',
        fruitOfTheMystery: 'Busca constante de Jesus e Sabedoria Divina',
        meditation: 'Após três dias de aflita procura, Maria e José encontram o Menino Jesus no Templo de Jerusalém, assentado no meio dos mestres, ouvindo-os e interrogando-os.',
      },
    ],
  },
  dolorosos: {
    id: 'dolorosos',
    name: 'Mistérios Dolorosos',
    subtitle: 'A Paixão e Morte de Nosso Senhor Jesus Cristo',
    daysOfWeek: 'Terças e Sextas-feiras',
    daysOfWeekNumbers: [2, 5], // Tuesday and Friday
    mysteries: [
      {
        number: 1,
        title: 'A Agonia de Jesus no Horto das Oliveiras',
        biblicalReference: 'Mt 26, 36-46',
        fruitOfTheMystery: 'Verdadeira Contrição dos Pecados',
        meditation: 'Jesus suou gotas de sangue no Jardim do Getsêmani ao tomar sobre Si todos os nossos pecados. Ele ora: "Pai, se é do teu agrado, afasta de mim este cálice; não se faça, porém, a minha vontade, mas a tua".',
      },
      {
        number: 2,
        title: 'A Flagelação de Nosso Senhor Jesus Cristo',
        biblicalReference: 'Mt 27, 26',
        fruitOfTheMystery: 'Mortificação dos Sentidos e Pureza',
        meditation: 'Por ordem de Pilatos, o Cordeiro Imaculado de Deus é despojado de suas vestes e cruelmente açoitado atado à coluna para expiar as nossas culpas.',
      },
      {
        number: 3,
        title: 'A Coroação de Espinhos de Jesus',
        biblicalReference: 'Mt 27, 27-31',
        fruitOfTheMystery: 'Desprezo do Orgulho e do Respeito Humano',
        meditation: 'Os soldados zombam de sua realeza, cobrem-no com um manto púrpura e cravam em sua sagrada fronte uma dolorosa coroa de espinhos pontiagudos.',
      },
      {
        number: 4,
        title: 'Jesus carrega a Cruz até o Monte Calvário',
        biblicalReference: 'Jo 19, 17',
        fruitOfTheMystery: 'Paciência nas Cruzes e Dificuldades da Vida',
        meditation: 'Exausto e ferido, Jesus carrega o pesado lenho da Cruz pelas ruas de Jerusalém, caindo várias vezes e encontrando no caminho sua Mãe dolorosa.',
      },
      {
        number: 5,
        title: 'A Crucificação e Morte de Jesus na Cruz',
        biblicalReference: 'Lc 23, 33-46',
        fruitOfTheMystery: 'Salvação das Almas e Perdão aos Inimigos',
        meditation: 'Depois de três horas de intensa agonia na Cruz, Jesus entrega Maria como nossa Mãe ao discípulo amado e clama: "Pai, em tuas mãos entrego o meu espírito".',
      },
    ],
  },
  gloriosos: {
    id: 'gloriosos',
    name: 'Mistérios Gloriosos',
    subtitle: 'O Triunfo da Ressurreição e da Vida Eterna',
    daysOfWeek: 'Quartas-feiras e Domingos',
    daysOfWeekNumbers: [0, 3], // Sunday and Wednesday
    mysteries: [
      {
        number: 1,
        title: 'A Ressurreição Gloriosa de Jesus dentre os Mortos',
        biblicalReference: 'Mt 28, 1-10',
        fruitOfTheMystery: 'Fé Viva e Conversão Interior',
        meditation: 'No terceiro dia após a sua morte, Cristo vence as trevas do túmulo e ressurge radiante e imortal, assegurando-nos a vitória definitiva sobre o pecado e a morte.',
      },
      {
        number: 2,
        title: 'A Admirável Ascensão de Jesus ao Céu',
        biblicalReference: 'At 1, 9-11',
        fruitOfTheMystery: 'Esperança e Desejo do Céu',
        meditation: 'Quarenta dias após a Ressurreição, Jesus sobe aos Céus à vista de seus discípulos e senta-se à direita do Pai para nos preparar um lugar eterno.',
      },
      {
        number: 3,
        title: 'A Descida do Espírito Santo no Cenáculo',
        biblicalReference: 'At 2, 1-4',
        fruitOfTheMystery: 'Zelo Apostólico e Amor Divino',
        meditation: 'Estando a Virgem Maria e os Apóstolos reunidos em oração em Pentecostes, o Espírito Santo desce em línguas de fogo, transformando-os em valorosos apóstolos.',
      },
      {
        number: 4,
        title: 'A Assunção de Nossa Senhora ao Céu',
        biblicalReference: 'Sl 44, 11-12',
        fruitOfTheMystery: 'Graça de uma Boa Morte e Devoção a Maria',
        meditation: 'Terminada a sua vida terrena, a Imaculada Mãe de Deus é elevada em corpo e alma à glória celeste pelos coros dos anjos.',
      },
      {
        number: 5,
        title: 'A Coroação de Nossa Senhora como Rainha do Céu e da Terra',
        biblicalReference: 'Ap 12, 1',
        fruitOfTheMystery: 'Perseverança Final e Confiança na Graça',
        meditation: 'A Santíssima Trindade coroa a Virgem Maria com diadema de doze estrelas como Rainha de todos os anjos e santos, perpétua medianeira de todas as graças.',
      },
    ],
  },
  luminosos: {
    id: 'luminosos',
    name: 'Mistérios Luminosos',
    subtitle: 'A Vida Pública e a Revelação do Reino de Jesus',
    daysOfWeek: 'Quintas-feiras',
    daysOfWeekNumbers: [4], // Thursday
    mysteries: [
      {
        number: 1,
        title: 'O Batismo de Jesus no Rio Jordão',
        biblicalReference: 'Mt 3, 13-17',
        fruitOfTheMystery: 'Fidelidade às Promessas Batismais',
        meditation: 'Jesus desce às águas do Jordão para ser batizado por João Batista. Os céus se abrem, o Espírito desce como pomba e a voz do Pai declara: "Este é o meu Filho amado".',
      },
      {
        number: 2,
        title: 'A Auto-revelação de Jesus nas Bodas de Caná',
        biblicalReference: 'Jo 2, 1-11',
        fruitOfTheMystery: 'Fidelidade nas Famílias e Escuta a Maria',
        meditation: 'Por intercessão materna de Maria ("Fazei tudo o que Ele vos disser"), Jesus opera seu primeiro milagre, transformando água em vinho precioso.',
      },
      {
        number: 3,
        title: 'O Anúncio do Reino de Deus e o Chamado à Conversão',
        biblicalReference: 'Mc 1, 14-15',
        fruitOfTheMystery: 'Espírito de Penitência e Conversão Contínua',
        meditation: 'Jesus proclama: "O tempo se cumpriu e o Reino de Deus está próximo; arrependei-vos e crede no Evangelho", perdoando os pecados com divina misericórdia.',
      },
      {
        number: 4,
        title: 'A Transfiguração de Jesus no Monte Tabor',
        biblicalReference: 'Lc 9, 28-36',
        fruitOfTheMystery: 'Desejo de Santidade e Oração Contemplativa',
        meditation: 'No cume do Tabor diante de Pedro, Tiago e João, o rosto de Jesus resplandece como o sol e suas vestes tornam-se de um branco fulgurante revelando sua glória divina.',
      },
      {
        number: 5,
        title: 'A Instituição da Santíssima Eucaristia',
        biblicalReference: 'Mt 26, 26-29',
        fruitOfTheMystery: 'Amor fervoroso à Sagrada Eucaristia',
        meditation: 'Na Última Ceia, Jesus toma o pão e o cálice, dá graças e entrega seu Corpo e Sangue aos discípulos: "Fazei isto em memória de Mim", perpetuando seu sacrifício de amor.',
      },
    ],
  },
};

// Gets the default mystery of the day based on local day of the week
export function getDefaultMysteryForDate(date: Date = new Date()): MysteryType {
  const day = date.getDay(); // 0 = Domingo, 1 = Segunda, etc.
  if (day === 1 || day === 6) return 'gozosos';
  if (day === 2 || day === 5) return 'dolorosos';
  if (day === 4) return 'luminosos';
  return 'gloriosos'; // Quarta (3) e Domingo (0)
}

/**
 * Builds the complete structured Rosary sequence (all beads and prayers)
 */
export function buildRosarySequence(mysteryType: MysteryType): RosaryStep[] {
  const group = MYSTERY_GROUPS[mysteryType];
  const steps: RosaryStep[] = [];
  let indexCounter = 0;

  // 1. Sinal da Cruz (Crucifixo)
  steps.push({
    id: 'sign_of_cross_intro',
    index: indexCounter++,
    beadType: 'sign_of_cross',
    title: 'Início do Santo Terço',
    subtitle: 'Sinal da Cruz',
    prayerTitle: PRAYERS.signOfCross.title,
    prayerText: PRAYERS.signOfCross.text,
    fruitOrIntention: 'Em nome do Pai, e do Filho, e do Espírito Santo.',
    beadVisualId: 'bead_crucifix',
  });

  // 2. Oferecimento do Terço (Crucifixo)
  steps.push({
    id: 'offering_intro',
    index: indexCounter++,
    beadType: 'crucifix',
    title: 'Oferecimento',
    subtitle: 'Consagração do Terço',
    prayerTitle: PRAYERS.offering.title,
    prayerText: PRAYERS.offering.text,
    fruitOrIntention: 'Intenções do Santo Terço',
    beadVisualId: 'bead_crucifix',
  });

  // 3. Creio em Deus Pai (Crucifixo)
  steps.push({
    id: 'creed',
    index: indexCounter++,
    beadType: 'crucifix',
    title: 'Profissão de Fé',
    subtitle: 'No Crucifixo',
    prayerTitle: PRAYERS.creed.title,
    prayerText: PRAYERS.creed.text,
    fruitOrIntention: 'Fé e fidelidade à Santa Igreja',
    beadVisualId: 'bead_crucifix',
  });

  // 4. Primeiro Pai Nosso (Primeira conta grande pendente)
  steps.push({
    id: 'our_father_intro',
    index: indexCounter++,
    beadType: 'our_father',
    title: 'Pai Nosso Introdutório',
    subtitle: 'Pelas intenções do Santo Padre o Papa',
    prayerTitle: PRAYERS.ourFather.title,
    prayerText: PRAYERS.ourFather.text,
    fruitOrIntention: 'Pelo Sumo Pontífice e a Igreja no mundo',
    beadVisualId: 'bead_intro_our_father',
  });

  // 5, 6, 7. Três Ave Marias pelas Virtudes Teologais (Fé, Esperança e Caridade)
  const theologicalVirtues = [
    { name: '1ª Ave Maria', subtitle: 'Pelo aumento da Fé', intention: 'Virtude Teologal da Fé' },
    { name: '2ª Ave Maria', subtitle: 'Pelo aumento da Esperança', intention: 'Virtude Teologal da Esperança' },
    { name: '3ª Ave Maria', subtitle: 'Pelo aumento da Caridade', intention: 'Virtude Teologal da Caridade' },
  ];

  theologicalVirtues.forEach((v, i) => {
    steps.push({
      id: `hail_mary_intro_${i + 1}`,
      index: indexCounter++,
      beadType: 'hail_mary',
      title: v.name,
      subtitle: v.subtitle,
      prayerTitle: PRAYERS.hailMary.title,
      prayerText: PRAYERS.hailMary.text,
      fruitOrIntention: v.intention,
      beadVisualId: `bead_intro_hm_${i + 1}`,
    });
  });

  // 8. Glória ao Pai introdutório (Antes da medalha)
  steps.push({
    id: 'glory_intro',
    index: indexCounter++,
    beadType: 'glory',
    title: 'Glória ao Pai',
    subtitle: 'Louvor à Santíssima Trindade',
    prayerTitle: PRAYERS.glory.title,
    prayerText: PRAYERS.glory.text,
    fruitOrIntention: 'Glória ao Pai, e ao Filho, e ao Espírito Santo',
    beadVisualId: 'bead_medal',
  });

  // 5 Dezenas / Mistérios
  for (let dec = 0; dec < 5; dec++) {
    const decNum = dec + 1;
    const mystery = group.mysteries[dec];

    // Anúncio e Pai Nosso da Dezena (Conta Grande da dezena)
    steps.push({
      id: `decade_${decNum}_our_father`,
      index: indexCounter++,
      decadeIndex: decNum,
      beadType: 'our_father',
      title: `${decNum}º Mistério: Pai Nosso`,
      subtitle: mystery.title,
      prayerTitle: `${mystery.title} (${mystery.biblicalReference})`,
      prayerText: `${PRAYERS.ourFather.text}\n\n[Fruto: ${mystery.fruitOfTheMystery}]`,
      fruitOrIntention: `${mystery.fruitOfTheMystery} • ${mystery.meditation}`,
      beadVisualId: `bead_dec_${decNum}_of`,
    });

    // 10 Ave Marias da Dezena
    for (let hm = 1; hm <= 10; hm++) {
      steps.push({
        id: `decade_${decNum}_hm_${hm}`,
        index: indexCounter++,
        decadeIndex: decNum,
        subIndex: hm,
        beadType: 'hail_mary',
        title: `${hm}ª Ave Maria`,
        subtitle: `${decNum}º Mistério: ${mystery.title}`,
        prayerTitle: `Ave Maria (${hm}/10) • ${decNum}º Mistério`,
        prayerText: PRAYERS.hailMary.text,
        fruitOrIntention: `${mystery.fruitOfTheMystery} (${mystery.biblicalReference})`,
        beadVisualId: `bead_dec_${decNum}_hm_${hm}`,
      });
    }

    // Glória ao Pai da Dezena
    steps.push({
      id: `decade_${decNum}_glory`,
      index: indexCounter++,
      decadeIndex: decNum,
      beadType: 'glory',
      title: `Glória ao Pai (${decNum}ª Dezena)`,
      subtitle: `${decNum}º Mistério Concluído`,
      prayerTitle: PRAYERS.glory.title,
      prayerText: PRAYERS.glory.text,
      fruitOrIntention: 'Louvor à Santíssima Trindade',
      beadVisualId: `bead_dec_${decNum}_of`, // lights up the decade connector
    });

    // Oração de Fátima (Jaculatória)
    steps.push({
      id: `decade_${decNum}_fatima`,
      index: indexCounter++,
      decadeIndex: decNum,
      beadType: 'fatima',
      title: `Jaculatória de Fátima (${decNum}ª Dezena)`,
      subtitle: 'Ó Meu Jesus',
      prayerTitle: PRAYERS.fatimaPrayer.title,
      prayerText: PRAYERS.fatimaPrayer.text,
      fruitOrIntention: 'Misericórdia para todas as almas',
      beadVisualId: `bead_dec_${decNum}_of`,
    });
  }

  // Agradecimento Final (Medalha)
  steps.push({
    id: 'thanksgiving_final',
    index: indexCounter++,
    beadType: 'medal',
    title: 'Agradecimento',
    subtitle: 'Na Medalha Central',
    prayerTitle: PRAYERS.thanksgiving.title,
    prayerText: PRAYERS.thanksgiving.text,
    fruitOrIntention: 'Agradecimento maternal a Nossa Senhora',
    beadVisualId: 'bead_medal',
  });

  // Salve Rainha (Medalha de Nossa Senhora)
  steps.push({
    id: 'salve_regina_final',
    index: indexCounter++,
    beadType: 'salve_regina',
    title: 'Salve Rainha',
    subtitle: 'Consagração e Louvor Final',
    prayerTitle: PRAYERS.salveRegina.title,
    prayerText: PRAYERS.salveRegina.text,
    fruitOrIntention: 'Rogai por nós, Santa Mãe de Deus',
    beadVisualId: 'bead_medal',
  });

  // Sinal da Cruz de Conclusão (Crucifixo)
  steps.push({
    id: 'sign_of_cross_final',
    index: indexCounter++,
    beadType: 'sign_of_cross',
    title: 'Bênção e Conclusão',
    subtitle: 'Sinal da Cruz Final',
    prayerTitle: PRAYERS.signOfCross.title,
    prayerText: PRAYERS.signOfCross.text,
    fruitOrIntention: 'Louvado seja Nosso Senhor Jesus Cristo! Para sempre seja louvado.',
    beadVisualId: 'bead_crucifix',
  });

  return steps;
}
