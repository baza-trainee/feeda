"use client";
import React, { useState, useEffect } from "react";
import { Header, Container, AcceptBtn, VerifyCont } from "./VerifyHome.styles";

const VerifyHome = () => {
  const [next, setNext] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  useEffect(() => {
    const handleScroll: EventListener = (e: Event) => {
      const target = e.target as HTMLElement;
      const isBottom =
        target.scrollHeight - target.scrollTop === target.clientHeight;
      setIsScrolledToBottom(isBottom);
    };

    const container = document.getElementById("scrollable-container");
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleClick = () => {
    setNext(true);
  };

  return (
    <VerifyCont>
      {next ? (
        <Header>Умови та правила участі на проєкті</Header>
      ) : (
        <Header>Згода на обробку персональних даних</Header>
      )}
      <Container id="scrollable-container">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
          quidem hic amet. Omnis quidem repellat impedit eveniet ex provident,
          deserunt voluptates tenetur sit earum saepe recusandae ipsa ab
          corrupti quae. Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Dolorem sapiente minus, maiores eius suscipit possimus voluptas
          provident cum cumque nobis repellat atque exercitationem praesentium
          animi sit nisi optio consectetur dolorum. Facilis eaque amet,
          laudantium reiciendis repellat libero incidunt. Laudantium error,
          ducimus, temporibus quaerat incidunt placeat labore cum officia
          molestias eaque totam omnis tenetur fuga? Repellat amet incidunt odio
          nulla in! Neque porro quo eum laboriosam, aspernatur repellat dolorum
          ipsum, blanditiis, sequi accusantium libero minus excepturi non. Odio
          dolorem iste at error quae nihil magni nemo, corrupti commodi! Unde,
          illum iste? Incidunt quod blanditiis tempore rerum at odit minima
          reprehenderit atque facere aliquid temporibus facilis nostrum, eius,
          maiores quam maxime? Eaque consequatur tempore reiciendis quisquam
          assumenda omnis tempora nemo placeat ab! Ut similique quam placeat
          facilis, suscipit cumque quaerat exercitationem amet iusto dolorum.
          Rerum soluta dolore est eveniet officia, quia voluptate quos qui
          facilis ea repudiandae suscipit, sed, expedita veritatis aspernatur!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
          provident omnis odio. Nemo modi libero odit magnam non, sed vitae hic
          ea quas iusto aliquid explicabo fuga rerum rem reprehenderit?
          Voluptates facere ducimus sit, qui asperiores totam odit obcaecati
          dolore incidunt deserunt assumenda fugiat dolor modi nulla nobis,
          impedit molestiae vel amet ex eaque quia delectus nisi accusantium?
          Autem, vel. Architecto alias atque magnam officia rem et nemo quae,
          exercitationem iure deserunt, velit eos! Deleniti dolore tenetur
          cupiditate dolores voluptate? Praesentium, deleniti nostrum! Iure
          doloremque debitis blanditiis delectus recusandae tempora. Unde vitae
          modi accusantium dolore sit ab labore obcaecati! Accusantium
          laboriosam nulla, molestiae vero nostrum ipsa error optio accusamus
          tempore maxime porro, sit delectus repellendus assumenda at iusto
          reiciendis tempora! Nemo dolore sed ad laborum exercitationem quidem
          dicta repudiandae illum doloremque accusantium, iusto asperiores
          doloribus. Doloremque odit quaerat voluptates ad sed, dolor, quas non
          laboriosam impedit recusandae sapiente voluptatibus numquam. Ipsum,
          aliquid perspiciatis! Amet distinctio molestiae laboriosam unde
          impedit voluptate, necessitatibus veritatis neque rerum ipsa magnam,
          officia quis omnis maxime provident? Fugit quasi optio qui corporis
          nesciunt quia laborum quos. Modi rem quam quibusdam iusto, dignissimos
          quae sequi optio natus consequatur fuga in iste officiis rerum sed,
          eaque praesentium quo non provident corporis expedita perspiciatis
          deserunt repellendus! Corporis, alias obcaecati. Dolorem ad commodi,
          quis perspiciatis delectus aperiam, nesciunt quaerat culpa error ab,
          inventore earum debitis facilis architecto dolores odio quo. Voluptas
          sapiente iure eos ratione quisquam quis dicta obcaecati dolor! Quae
          architecto sunt voluptatum amet corporis distinctio labore vel aut
          incidunt. Accusamus, sapiente! Quae culpa nostrum, ut pariatur porro
          vel, ab quo sequi vitae excepturi sit commodi quisquam est voluptatem.
          Culpa odio repellendus sunt voluptates explicabo quos? Est ad rerum,
          iusto ipsa delectus reiciendis modi, velit magnam facilis fugit
          pariatur nam nulla deserunt vitae doloremque quidem, eaque ratione
          ipsam consectetur! Consectetur nam explicabo, neque dolorem officia a
          quo veniam placeat nihil labore animi recusandae, enim, quidem illo
          nesciunt eum quis doloremque error quibusdam temporibus eveniet esse
          illum magni. Eaque, sint? Mollitia laborum, cupiditate quaerat fuga
          iste esse expedita pariatur, eligendi eos repudiandae impedit nostrum
          rem praesentium fugit. Eveniet, adipisci odit laboriosam tempore
          voluptatem autem numquam libero, ad illo labore accusantium? Tempora
          rerum quisquam repellat, saepe molestiae molestias aspernatur
          consequatur minima voluptatem laudantium vel aliquam. Blanditiis quam
          enim perferendis quidem quae maiores necessitatibus ipsum, consequatur
          architecto corporis, amet, dolorem distinctio doloremque. Iure,
          debitis! Tenetur iste odio alias dolore porro ullam voluptatum neque
          impedit, similique, quia pariatur quam. Quibusdam quas molestias ea
          perspiciatis distinctio nihil assumenda! Cupiditate magni impedit
          magnam modi ipsum. Quisquam voluptas architecto quaerat error corrupti
          voluptates laboriosam eaque magnam officiis officia, consectetur sed
          aspernatur blanditiis dolore nemo, ea iure provident. Animi, mollitia
          molestiae at tenetur nihil amet quibusdam aliquam? At illo hic
          expedita corporis et nihil alias beatae necessitatibus aperiam
          repellat qui, aut in numquam soluta dolore facere reiciendis
          reprehenderit laboriosam? Odio omnis tempora ratione deserunt
          aspernatur ad doloribus! Laudantium magnam ad sunt odit qui quia
          maxime cupiditate porro ipsum libero cum, vero quam harum commodi
          minus! Earum magni consequuntur pariatur expedita ipsam ea hic! Dicta
          hic tempore quas. Eaque omnis alias, architecto, iste et velit
          consectetur ex, dolore quam modi pariatur quidem vitae animi. Fugit,
          rem labore alias aut voluptatibus quidem, tempore unde tenetur
          suscipit quo ex optio! Voluptatum facilis consequuntur doloremque ea
          nam. Ut corporis eius nemo quaerat reprehenderit expedita vero amet
          eum exercitationem aliquid, in quo mollitia, ullam obcaecati voluptas
          soluta eveniet laudantium vel architecto cupiditate? Quae odit
          recusandae distinctio doloribus dicta quod maxime minima nisi illo
          facilis nostrum iure quibusdam et, magni repellat quasi eaque, quia
          dolores voluptatum sit commodi! Sunt ducimus veritatis cumque!
          Corrupti. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Voluptatum, dolorum quia, exercitationem necessitatibus magnam
          reprehenderit ab aliquam ipsam, dolore tempore et id eligendi corporis
          labore ipsa mollitia! Eius, repellendus incidunt. Laudantium ipsa
          mollitia distinctio provident inventore debitis, qui ipsam suscipit
          laborum alias, doloremque soluta nobis corporis doloribus, obcaecati
          est voluptas natus! Vel minima perspiciatis at nulla provident sed
          distinctio temporibus! Itaque, sapiente. Facilis neque nemo incidunt
          consectetur earum possimus quam libero numquam nostrum quibusdam omnis
          nesciunt harum, quod laudantium debitis, repudiandae eius qui voluptas
          tempore dolores? Deserunt esse earum consequatur. Autem, esse?
          Recusandae illo excepturi nihil earum eos a suscipit modi, quis
          perferendis id, corporis similique ad voluptatibus iusto, nam numquam
          aperiam provident. Molestias accusantium laudantium quae, eius maxime
          reiciendis. Iste labore iusto quo aspernatur saepe ea aut vitae sequi
          eos modi beatae voluptate debitis est quos harum nulla veritatis,
          exercitationem itaque ratione a. Atque possimus nostrum odio nisi
          tenetur? Repellat incidunt ratione eveniet consequatur rerum, possimus
          aliquam, accusamus iusto nobis ullam quae tenetur! Nihil ratione
          reiciendis aut vitae quod dignissimos, eaque, suscipit libero quidem
          delectus, voluptas itaque quibusdam iure. Culpa odio velit labore
          quod, officia dolores qui odit nulla laudantium adipisci ea aspernatur
          veniam beatae natus animi, nostrum voluptatum sint, assumenda ducimus
          consectetur temporibus quam. Voluptates, numquam sit. Debitis. Sit
          adipisci repellat quisquam, exercitationem officia dolore vel quos
          ipsum perferendis tempore doloremque, voluptas rerum natus quidem
          delectus explicabo nobis commodi temporibus consequuntur illum sunt
          veritatis laborum unde amet. Molestias. Velit deleniti impedit rem
          quos repudiandae et repellat libero optio odio quod numquam alias
          beatae voluptatum, labore cumque eligendi sed autem reiciendis dolore
          obcaecati praesentium dignissimos! Nobis fugiat dolor impedit. Vero
          amet quasi doloribus, natus quos voluptatibus quia, nisi mollitia
          voluptatum porro nemo harum labore accusamus quisquam! Reprehenderit
          ipsam natus consequuntur corporis optio, ab laudantium. Vel dolore ex
          quisquam ullam. Reprehenderit impedit tempore reiciendis a quisquam
          distinctio obcaecati quibusdam facilis illum ipsum tenetur aliquam
          perspiciatis odio voluptatem veniam praesentium quas ad, eaque soluta
          aliquid numquam dolor sint alias veritatis? Aut. Repellat delectus vel
          soluta officia velit eos ad quia voluptate consequatur non
          voluptatibus porro, laboriosam facilis temporibus sed quasi
          perferendis harum, quibusdam facere? Natus repudiandae eius doloremque
          aspernatur facilis. In! Dignissimos saepe quis suscipit et doloribus
          recusandae optio, natus sequi iure dolorem, hic qui, adipisci ad odit
          ipsam. Quod hic amet illum corporis voluptates, magnam sint ratione
          quas sapiente exercitationem. Odit ullam neque id cumque. Eligendi
          soluta aliquam atque laudantium blanditiis repudiandae excepturi illo,
          deleniti corporis? Soluta quasi repudiandae quibusdam natus deserunt,
          atque illo officia maiores autem deleniti, quod doloribus? Est et
          explicabo quis dicta? Dolorum, odio laboriosam. Consequuntur, quisquam
          vero fuga facere ullam ipsum autem, optio aliquid at molestiae earum
          veniam, magnam libero sed voluptate ab eos obcaecati pariatur! Dolores
          necessitatibus ratione, esse, cum quisquam debitis cupiditate placeat
          minima architecto eligendi molestias? Eius culpa dolores ullam
          quibusdam sit aperiam dolorum. Doloribus ratione qui quidem? Illum
          repudiandae quidem saepe pariatur. Perferendis incidunt ipsam, aperiam
          aliquam corporis, amet impedit dolor porro quam sed nisi recusandae
          sit necessitatibus mollitia architecto ullam alias corrupti. Repellat
          quis quidem, maxime sit nostrum accusantium beatae quisquam? Eligendi
          suscipit tempore praesentium commodi laborum earum illum non numquam
          ab. Alias accusantium labore, enim fugit recusandae non aspernatur
          quam rem vitae et hic nobis quae dignissimos, voluptate ratione saepe.
          Explicabo in sed similique eum asperiores. Voluptatibus hic optio non
          aspernatur deleniti maxime incidunt laudantium, officia libero sed
          molestias consectetur, blanditiis recusandae, ipsum eos culpa
          quibusdam voluptas facilis exercitationem voluptatem. Ratione quo,
          illo esse quas dolorem maxime. Unde doloremque recusandae iure,
          perferendis hic voluptatem voluptatibus dolorem voluptate distinctio
          nulla. Ratione magni tempore voluptatum nesciunt deserunt maxime
          aperiam quae quos ipsum.
        </p>
      </Container>
      <AcceptBtn
        onClick={handleClick}
        isActive={isScrolledToBottom}
        disabled={!isScrolledToBottom}
      >
        Приймаю
      </AcceptBtn>
    </VerifyCont>
  );
};

export default VerifyHome;
