'use client';

import { useState } from 'react';

import { ConfirmRemoval } from './Additional/ConfirmRemoval/ConfirmRemoval';
import { SuccessNotification } from './Additional/SuccessNotification/SuccessNotification';

const body = document.querySelector('body');

/* Компонент-приклад як використовувати поп-ап, просто імпортуй цей компонет на свою сторінку. */
/* Якщо є питання звертайся до tipanazar */

export function PopUpTester() {
  const [show, setShow] = useState(false);

  const yesCallback = () => {
    console.log('yes');
    body.style.overflow = 'auto';
    setShow(!show);
  };
  const noCallback = () => {
    console.log('no');
    body.style.overflow = 'auto';
    setShow(!show);
  };

  return (
    <>
      {/* {show && (
        <ConfirmRemoval
          yesCallback={yesCallback}
          noCallback={noCallback}
          target="учасника"
          closeModalFunc={() => setShow(!show)}
        />
      )} */}
      {show && <SuccessNotification closeModalFunc={() => setShow(!show)} />} 
      <button type="button" onClick={() => setShow(!show)}>
        Open Modal
      </button>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe perferendis, aliquid rerum a, laboriosam provident
      accusamus, ex at magnam aliquam libero pariatur temporibus adipisci quos suscipit harum optio eaque. Eos.
      Necessitatibus illum quos voluptates modi sequi, perferendis culpa voluptatum qui sint tempora aspernatur alias
      quas nam nisi earum nostrum quibusdam autem eligendi non ab? Ipsam reprehenderit commodi magni quis ad. Rem
      tempore amet dolorem voluptates neque enim optio atque adipisci necessitatibus accusamus officia dolorum
      asperiores aspernatur modi quis, nam doloribus nobis et dolor, ea magnam, molestiae ipsa unde? Quaerat, quam!
      Aspernatur sapiente quae voluptatem natus necessitatibus vel laboriosam delectus? Eaque voluptatibus quidem,
      dolores sapiente perferendis dolor, quos qui totam, aut ad libero excepturi provident praesentium sed culpa minus?
      Necessitatibus, aspernatur. Obcaecati est molestiae praesentium aspernatur dicta esse labore enim voluptas iste
      officiis, asperiores explicabo hic ducimus recusandae voluptatibus! Corrupti obcaecati possimus culpa ducimus vero
      dicta deserunt. Natus placeat modi libero. Debitis cumque dolor nobis nihil quo eum inventore nulla fugit iure
      adipisci quis quibusdam in quidem totam maxime quisquam ullam, consequatur esse molestias laborum enim alias fuga?
      Quia, autem molestiae! Animi sapiente reprehenderit autem. Impedit neque aut eius et sunt nulla nemo vitae
      necessitatibus aliquam quidem facilis nihil id illum nam totam rem, dolorem eum fugiat maiores tenetur dolorum
      delectus! Molestiae quibusdam, sint deleniti reprehenderit culpa magni dolores labore vel optio ullam, tempora
      sapiente sunt, expedita eaque ipsa distinctio voluptate pariatur maiores impedit ratione veniam eligendi accusamus
      aliquam? Porro, itaque? Nulla rerum possimus deleniti assumenda modi earum aspernatur dignissimos ipsa laboriosam
      ducimus! Atque officiis eius ratione corrupti tempore necessitatibus quod. Rem quidem eligendi exercitationem
      unde, alias quod animi suscipit perferendis. Vitae unde commodi, ullam quasi ex nobis similique amet eum a dolorem
      delectus dolore necessitatibus sequi ut magni ea quia sapiente consectetur pariatur blanditiis molestiae iure
      reiciendis. Soluta, accusamus esse. Quis assumenda aperiam quasi exercitationem placeat animi, eum quaerat
      nesciunt suscipit eligendi magnam inventore laudantium, similique natus? Excepturi debitis et ipsam quasi
      accusantium officiis quod mollitia, expedita, inventore nobis provident! Eius reiciendis mollitia labore, cum
      aliquid, corporis omnis impedit similique neque, numquam est magnam provident voluptatem minus officia dicta
      dignissimos tempora deserunt ipsam commodi. Unde ratione vitae quo quas consequuntur. Pariatur sapiente nulla aut
      eius nemo animi voluptatem, rerum eaque consequatur dolorem ex molestiae consectetur ipsum explicabo, eos
      molestias modi. Ut eaque ex sed exercitationem excepturi modi repellat doloribus temporibus. Amet aliquid quos
      dolor aut excepturi, odit aspernatur. Excepturi incidunt in asperiores consectetur, consequuntur explicabo, error
      delectus ducimus eveniet nemo iusto esse id ipsum molestiae sint voluptas iste ipsa tenetur. Qui recusandae
      deleniti reiciendis a ipsum harum fuga at quia, quis fugit animi eaque commodi laborum pariatur expedita ullam rem
      itaque est vitae nostrum! Ad veritatis quae nobis consequatur incidunt.
    </>
  );
}
