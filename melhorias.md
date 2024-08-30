/*  MELHORIAS

    1. Separação de Responsabilidades: Sua função cadastrarAtivo faz muito trabalho ao ramificar em várias categorias. Considere dividi-la ainda mais ou usar um padrão de fábrica para simplificar a lógica, tornando-a mais fácil de manter e estender.

        2. Uso de Constantes: Se você tiver strings repetidas para categorias ou nomes de tabelas, pode defini-las como constantes no início do arquivo. Isso pode ajudar a evitar erros de digitação e facilitar mudanças, se necessário.

            3. Mensagens de Feedback: Certifique-se de que todas as mensagens de feedback sejam claras e consistentes. Você pode padronizar suas mensagens de sucesso e erro para uniformidade.

                4. Considere Async/Await: Se ainda não o fez, considere usar async/await para operações de banco de dados, para tornar seu código mais limpo e fácil de seguir em comparação ao uso de callbacks.

*/