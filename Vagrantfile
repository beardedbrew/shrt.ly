# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"


Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.hostname = "shrt.ly"
  config.vm.network :private_network, ip: "192.168.61.100"

  config.vm.provision "docker" do |d|
      d.pull_images "centurylink/mysql"
    end
    config.vm.provision :shell, path: "docker/docker_start", run: "always"

end
