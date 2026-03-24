---
title: "Infraestrutura Red Team: Construindo C2 Ocultos com Terraform"
category: "Red Team"
date: "Fev 2025"
image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80"
---

# Construindo Infraestrutura de C2 Oculta

Uma das partes mais críticas de uma operação de Red Team bem-sucedida é a resiliência da infraestrutura de Command and Control (C2). Se o Blue Team (equipe de defesa) derrubar seu servidor principal nas primeiras 24 horas, a simulação acaba cedo demais.

Neste artigo, vou mostrar como utilizar **Terraform** e **Ansible** para provisionar rapidamente uma infraestrutura compartimentada e focada em OPSEC (Operational Security).

## O Problema do C2 Direto

Muitos iniciantes apontam seus payloads diretamente para o IP do servidor C2 (como Cobalt Strike, Mythic ou Sliver). Isso é um erro fatal:

1. O IP real do servidor é exposto no payload.
2. Defensores podem bloquear o IP no firewall.
3. Analistas de malware podem investigar seu servidor diretamente.

## A Solução: Redirectors

A solução padrão na indústria é usar **Redirectors** (Redirecionadores). Um redirector atua como um proxy reverso burro (geralmente Nginx, Apache ou HAProxy) ou socat que fica entre a vítima e o servidor C2 real.

### Arquitetura Básica

1. **Payload** $\rightarrow$ **Domínio Falso (CDN/Domain Fronting)** $\rightarrow$ **Redirector (AWS/DigitalOcean)** $\rightarrow$ **Servidor C2 Oculto**

Se o redirector for detectado e bloqueado, você simplesmente o destrói e sobe um novo em minutos, apontando um novo domínio para ele. O seu servidor C2 real — onde estão os dados da campanha e as sessões — permanece intocado e anônimo.

## Automação com Terraform

Para que essa substituição de redirectors seja rápida (e para que você não perca horas configurando servidores Linux na mão), utilizamos **Terraform**.

Abaixo um exemplo muito básico de como subir um droplet na DigitalOcean configurado como redirector:

```hcl
resource "digitalocean_droplet" "redirector_http" {
  image  = "ubuntu-22-04-x64"
  name   = "cdn-edge-node-01"
  region = "nyc3"
  size   = "s-1vcpu-1gb"
  
  # Adicionando nossa chave SSH
  ssh_keys = [data.digitalocean_ssh_key.default.id]

  # Script de inicialização (User Data) para instalar e configurar o Nginx
  user_data = <<-EOF
              #!/bin/bash
              apt-get update && apt-get install -y nginx
              # Configuração do proxy_pass omitida para brevidade
              systemctl enable nginx
              systemctl restart nginx
              EOF
}
```

## Considerações de OPSEC

Apenas subir o servidor não basta. É preciso garantir que o redirector pareça um servidor legítimo:

- **Certificados SSL válidos:** Use o Let's Encrypt (Certbot) para gerar certificados reais para os seus domínios falsos.
- **Filtro de Tráfego:** Configure o Nginx para redirecionar para o C2 **apenas** requisições que tenham cabeçalhos (headers) específicos ou que venham de URIs esperadas. Qualquer tráfego curioso (como crawlers do Blue Team ou bots do Shodan) deve ser redirecionado para um site legítimo (como o site do Google ou da Microsoft).

Com uma infraestrutura automatizada e bem planejada, sua operação de Red Team ganha a persistência necessária para simular Ameaças Persistentes Avançadas (APTs) de forma realista.
