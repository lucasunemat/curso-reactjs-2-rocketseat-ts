import styles from './Button.module.css';

interface ButtonProps {
    color?: 'primary' | 'secondary' | 'danger' | 'sucesss';
}

/**
 * Abaixo você pode ver que fazemos destructuring da propriedade color,
 * Definimos primary como valor padrão caso não seja passado nada.
 * Depois temos uma configuração de classe que diz:
 * Sempre terá a classe button
 * Seguida de...
 * styles[primary, ou secondary, ou danger, ou sucesss] => isso é para navegar entre as classes do css
 * A depender de qual classe for visada, vai mudar a cor do fundo (porque a classe do module faz isso)
 */

export function Button({ color = 'primary' }: ButtonProps) {
    return <button className={`${styles.button} ${styles[color]}`}>Click me!</button>;
}